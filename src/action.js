import Clipboard from 'clipboard'
import API from './api'
import View from './view'

const addClipboardListener = () => {
	new Clipboard('.btn')
}

const setBrancheNameAndAddClipboardListener = (name) => {
	View.setBranchName(`git checkout -b ${name}`)
	addClipboardListener()
}

const fetchBranchNameAttribute = (tabId) => {
	return new Promise((resolve, reject) => {
		API.getNewBranchButtonAttribute(tabId, 'title')
			.then(resolve)
			.catch(() => {
				API.getNewBranchButtonAttribute(tabId, 'data-original-title')
					.then(resolve)
					.catch(reject)
			})
	})
}

class Action {
	static fetchBranchName() {
		API.getCurrentTab()
			.then((tab) => {
				fetchBranchNameAttribute(tab.id)
					.then(setBrancheNameAndAddClipboardListener)
					.catch(() => View.setBranchName('Branch name not found'))
		})
	}
}

export default Action
