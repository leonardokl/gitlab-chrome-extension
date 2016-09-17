/* global chrome */

const responseIsValid = response => (
  !!(response && response[0] && response[0] !== null)
)

/* Chrome API calls returning promises */
class Chrome {
  static query(options) {
    return new Promise((resolve, reject) =>
      chrome.tabs.query(options, response =>
        responseIsValid(response) ?
          resolve(response[0]) :
          reject(response)
      )
    )
  }

  static executeScript(tabId, options) {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(tabId, options, (response) =>
        responseIsValid(response) ?
          resolve(response[0]) :
          reject(response)
      )
    })
  }
}

export default Chrome
