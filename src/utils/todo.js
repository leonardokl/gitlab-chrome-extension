import { GITLAB_TODO_ACTIONS, GITLAB_TODO_TYPES } from 'constants'

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

export const getTodoActionName = (todo) => {
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

export const getTodoLabel = (todo) => {
  return `${getTodoTargetType(todo)} ${todo.project.path_with_namespace}${getTodoTargetIID(todo)}`
}
