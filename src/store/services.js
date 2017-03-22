/* global chrome */

import { get } from 'axios'

const NOTIFICATION_IMAGE = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRgzEnTeWQR7O8OLYyLfWKGJ8Qi9ZZ3AJpNunypeswYyymTcUp4'

export const fetchUser = () => {

}

export const fetchOpenedIssue = () => {

}

export const fetchProjects = () => {

}

export const searchProjects = () => {

}

export const notification = (options) => {
  const notificationOptions = {
    iconUrl: NOTIFICATION_IMAGE,
    type: 'basic',
    ...options
  }

  chrome.notifications.create(null, notificationOptions)
}
