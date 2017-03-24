/* global chrome */

import { get } from 'axios'

const NOTIFICATION_IMAGE = '/public/images/logo-and-name.png'

export const fetchUser = (accessToken) => {
  console.log('accessToken', accessToken);
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
