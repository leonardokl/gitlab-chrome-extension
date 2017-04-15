/* global chrome */

const NOTIFICATION_IMAGE = '/public/images/logo-and-name.png'

export const basic = (options) => {
  const notificationOptions = {
    iconUrl: NOTIFICATION_IMAGE,
    type: 'basic',
    ...options
  }

  chrome.notifications.create(null, notificationOptions)
}

export const todo = (options) => {
  const notificationOptions = {
    iconUrl: NOTIFICATION_IMAGE,
    type: 'basic',
    ...options
  }

  chrome.notifications.create('new-todo', notificationOptions)
}

export default {
  basic,
  todo
}
