import API from 'api'
import {FETCH_ISSUE_BRANCH_NAME} from 'constants/action-types'

const fetchBranchNameAttribute = (tabId) => {
	return new Promise((resolve, reject) => {
		API.chrome.getNewBranchButtonAttribute(tabId, 'title')
			.then(resolve)
			.catch(() => {
				API.chrome.getNewBranchButtonAttribute(tabId, 'data-original-title')
					.then(resolve)
					.catch(reject)
			})
	})
}

export const fetchIssueBranchName = () => (dispatch) => {
  API.chrome.getCurrentTab()
    .then((tab) => {
      fetchBranchNameAttribute(tab.id)
        .then((response) => dispatch({
          type: FETCH_ISSUE_BRANCH_NAME,
          data: response
        }))
    })
}
