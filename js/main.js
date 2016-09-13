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
	try {
		ChromeAPI.getCurrentTab(function (tab) {
			ChromeAPI.fetchBranchName(tab[0].id, function (response) {console.log("response", response);
				if (!response) {
					return DOM.setBranchName("Branch name not found");
				}

				DOM.setBranchName(response);
				new Clipboard('.btn');
			});
		});
	} catch (err) {
		DOM.setBranchName("Branch name not found");
	}
});
