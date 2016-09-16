/* global chrome */

var Utils = {
	responseIsValid: function (response) {
		return !!(response && response[0] && response[0] !== null);
	}
}

/* Chrome API calls returning promises */
var ChromeAPI = {
	query: function (options) {
		return new Promise(function (resolve, reject) {
			chrome.tabs.query(options,
				function (response) {
					if (!Utils.responseIsValid(response)) {
						return reject(response)
					}

					resolve(response[0]);
				});
		});
	},

	executeScript: function (tabId, options) {
		return new Promise(function (resolve, reject) {
			chrome.tabs.executeScript(tabId, options, function (response) {
				if (!Utils.responseIsValid(response)) {
					return reject(response);
				}

				resolve(response[0]);
			});
		})
	}
};

var API = {
	chrome: ChromeAPI,

	getCurrentTab: function () {
		return API.chrome.query({active: true});
	},

	getNewBranchButtonAttribute: function (tabId, attribute) {
		return API.chrome.executeScript(tabId, {
			code: 'document.getElementById("new-branch").getElementsByTagName("a")[1].getAttribute("' + attribute  + '");',
		});
	}
};

var DOM = {
	setBranchName: function (value) {
		document.getElementById('branch-name').value = value;
	}
}

var Action = {
	addClipboardListener: function () {
		new Clipboard('.btn');
	},

	setBrancheNameAndAddClipboardListener: function (name) {
		DOM.setBranchName('git checkout -b ' + name);
		Action.addClipboardListener();
	},

	fetchBranchNameAttribute: function (tabId) {
		return new Promise(function (resolve, reject) {
			API.getNewBranchButtonAttribute(tabId, "title")
				.then(function (response) {
					resolve(response);
				})
				.catch(function () {
					API.getNewBranchButtonAttribute(tabId, "data-original-title")
						.then(function (response) {
							resolve(response);
						})
						.catch(function () {
							reject();
						});
				});
		})
	},

	fetchBranchName: function () {
		API.getCurrentTab()
			.then(function (tab) {
				Action.fetchBranchNameAttribute()
					.then(function (response) {
						Action.setBrancheNameAndAddClipboardListener(response);
					})
					.catch(function (error) {
						DOM.setBranchName('Branch name not found');
					});
		});
	}
};

var initApp = function () {
	Action.fetchBranchName();
};

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initApp);
