import pipe from 'lodash/fp/pipe'
import get from 'lodash/fp/get'
import { chrome, gitlab, toBadge } from 'utils'

async function handleAlarm() {
  try {
    const user = await chrome.storage.get('user')
    const todos = await gitlab.fetchTodos(user.accessToken)

    pipe(get('data.length'), toBadge, chrome.setBadge)(todos)
  } catch (err) {
    console.error(err)
  }
}

chrome.createAlarm('todos', {
  delayInMinutes: 1
})

chrome.onAlarm(handleAlarm)
