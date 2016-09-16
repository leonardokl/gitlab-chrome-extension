/* global chrome */

const responseIsValid = (response) => {
  return !!(response && response[0] && response[0] !== null);
}

/* Chrome API calls returning promises */
class Chrome {
	static query(options) {
		return new Promise((resolve, reject) => {
			chrome.tabs.query(options,
				(response) => {
					if (!responseIsValid(response)) {
						return reject(response);
					}

					resolve(response[0]);
				});
		});
	}

	static executeScript(tabId, options) {
		return new Promise((resolve, reject) => {
			chrome.tabs.executeScript(tabId, options, (response) => {
				if (!responseIsValid(response)) {
					return reject(response);
				}

				resolve(response[0]);
			});
		})
	}
};

export default Chrome;
