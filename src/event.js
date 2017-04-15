import pipe from 'lodash/fp/pipe'
import get from 'lodash/fp/get'
import { chrome, gitlab, notification, toBadge } from 'utils'
import { GITLAB_TODO_ACTIONS, GITLAB_TODO_TYPES, NOTIFICATION_IMAGE } from 'constants'

const createTodosAlarm = () => chrome.createAlarm('todos', { periodInMinutes: 1 })

const handleTodosBadge = pipe(get('length'), toBadge, chrome.setBadge)

const getTodoActionName = (todo) => {
  const actionName = todo.action_name

  switch (actionName) {
    case GITLAB_TODO_ACTIONS.ASSIGNED:
      return 'assign you'
    case GITLAB_TODO_ACTIONS.MENTIONED:
      return 'mentioned you on'
    case GITLAB_TODO_ACTIONS.APPROVAL_REQUIRED:
      return 'set you as an approver for'
    case GITLAB_TODO_ACTIONS.MARKED:
      return 'marked you on'
    case GITLAB_TODO_ACTIONS.BUILD_FAILED:
      return 'failed build on'

    default:
      return actionName.toLowerCase()
  }
}

const getTodoTargetType = (todo) => {
  const targetType = todo.target_type

  switch (targetType) {
    case GITLAB_TODO_TYPES.ISSUE:
      return 'issue'
    case GITLAB_TODO_TYPES.MERGE_REQUEST:
      return 'merge request'

    default:
      return targetType.toLowerCase()
  }
}

const getTodoTargetIID = (todo) => {
  const targetType = todo.target_type
  const { iid } = todo.target

  switch (targetType) {
    case GITLAB_TODO_TYPES.ISSUE:
      return `#${iid}`
    case GITLAB_TODO_TYPES.MERGE_REQUEST:
      return `!${iid}`

    default:
      return `/${iid}`
  }
}

const notifyNewRecentTodo = (todo) => {
  const authorName = todo.author.name
  const actionName = getTodoActionName(todo)
  const label = `${getTodoTargetType(todo)} ${todo.project.path_with_namespace}${getTodoTargetIID(todo)}`
  const title = `${authorName} ${actionName} ${label}`
  const message = todo.body

  notification.todo({ title, message })
}

async function handleTodoNotificationClick() {
  try {
    const todo = await chrome.storage.get('recentTodo')

    chrome.openTab(todo.target_url)
  } catch (err) {
    console.error(err)
  }
}

async function handleNewRecentTodo(todo) {
  try {
    const user = await chrome.storage.get('user')

    await chrome.storage.set('recentTodo', todo)

    if (user.id !== todo.author.id) notifyNewRecentTodo(todo)
  } catch (err) {
    console.error(err)
  }
}

async function handleInitialRecentTodo() {
  try {
    await chrome.storage.get('recentTodo')
  } catch (err) {
    await chrome.storage.set('recentTodo', null)
  }
}

async function handleLastTodo(lastTodo) {
  try {
    const recentTodo = await chrome.storage.get('recentTodo')

    if (!recentTodo || new Date(recentTodo.created_at) < new Date(lastTodo.created_at)) {
      return handleNewRecentTodo(lastTodo)
    }
  } catch (err) {
    console.error(err)
  }
}

async function handleAlarm() {
  try {
    const user = await chrome.storage.get('user')
    const recentTodo = await chrome.storage.get('recentTodo')
    const todos = await gitlab.fetchTodos(user.accessToken)
    const [lastTodo] = todos.data

    handleTodosBadge(todos.data)

    if (lastTodo) handleLastTodo(lastTodo)
  } catch (err) {
    console.error(err)
  }
}

chrome.onAlarm(handleAlarm)
chrome.onNotificationClick(id => {
  if (id === 'new-todo') handleTodoNotificationClick()
})

handleInitialRecentTodo()
createTodosAlarm()

