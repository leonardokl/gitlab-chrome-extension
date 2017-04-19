/* global chrome */

import curry from 'lodash/fp/curry'

const storage = ({
  getPersonalAccessToken: () => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get('personalAccessToken', (response) => {
        const { personalAccessToken } = response

        if (!personalAccessToken && personalAccessToken !== null ) reject(new Error(`personalAccessToken not found on storage`))

        return resolve(personalAccessToken)
      })
    })
  },
  setPersonalAccessToken: (personalAccessToken) => {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ personalAccessToken }, resolve)
    })
  },
  get: (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (response) => {
        const data = response[key]

        if (!data && data !== null ) reject(new Error(`Key ${key} not found on storage`))

        return resolve(data)
      })
    })
  },

  set: (key, data) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: data }, resolve)
    })
  },

  clear: () => {
    chrome.storage.local.clear()
    chrome.storage.sync.clear()
  },
})

const openTab = (url) => chrome.tabs.create({ url })

const setBadge = (text) => chrome.browserAction.setBadgeText({ text })

const clearBadge = () => chrome.browserAction.setBadgeText({ text: '' })

const getSelectedTab = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.getSelected((response) => {
      return response
        ? resolve(response)
        : reject(new Error(`Couldn't get the selected tab`))
    })
  })
}

const executeScript = curry((tabId, options) => {
  return new Promise((resolve) => {
    chrome.tabs.executeScript(tabId, options, (response) => {
      resolve(response[0])
    })
  })
})

const createAlarm = (name, options) => {
  return chrome.alarms.create(name, options)
}

const createNotification = chrome.notifications.create
const onAlarm = callback => chrome.alarms.onAlarm.addListener(callback)
const onNotificationClick = callback => chrome.notifications.onClicked.addListener(callback)

export default {
  storage,
  openTab,
  setBadge,
  clearBadge,
  getSelectedTab,
  executeScript,
  createAlarm,
  createNotification,
  onAlarm,
  onNotificationClick
}
