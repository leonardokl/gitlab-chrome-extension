import Chrome from 'utils/chrome'

class API {
	static getCurrentTab() {
		return Chrome.query({active: true})
	}

	static getNewBranchButtonAttribute(tabId, attribute) {
		return Chrome.executeScript(tabId, {
			code: `document.getElementById("new-branch")
						.getElementsByTagName("a")[1]
						.getAttribute("${attribute}")`
		})
	}
}

export default API
