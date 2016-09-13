var ChromeAPI = {
	fetchBranchName: function (tab, callback) {
		chrome.tabs.executeScript(tab, {
			code: 'document.getElementById("new-branch").getElementsByTagName("a")[0].getAttribute("data-original-title");'
		}, callback);
	},
	getCurrentTab: function (callback) {
		chrome.tabs.query({active: true}, callback);
	}
};

var DOM = {
	setBranchName: function (value) {
		document.getElementById('branch-name').value = value;
	}
}

document.addEventListener('DOMContentLoaded', function() {
	ChromeAPI.getCurrentTab(function (tab) {
		ChromeAPI.fetchBranchName(tab[0].id, function (response) {
			DOM.setBranchName(response);
			new Clipboard('.btn');
		});
	});
});
