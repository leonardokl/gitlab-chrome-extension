/* global chrome */

import Chrome from 'utils/chrome'

class ChromeAPI {
	static getCurrentTab() {
		return Chrome.query({active: true})
	}

	static getNewBranchButtonAttribute(tabId, attribute) {
		return Chrome.executeScript(tabId, {
			code: `document.querySelector("#new-branch a")
						.getAttribute("${attribute}")`
		})
	}

	static getStorage(item) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(item, (response) => {
        if (Object.keys(response).length === 0 && response.constructor === Object)
          return reject(response)

        return resolve({data: response[item]})
      })
    })
  }

	static setStorage(item) {
		return new Promise((resolve) =>
			chrome.storage.sync.set(item, resolve)
		)
	}

	static clearStorage() {
    return new Promise((resolve) => {
      chrome.storage.sync.clear(resolve)
    })
  }
}

export default ChromeAPI
