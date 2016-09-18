import API from 'api'
import * as actionTypes from 'constants/action-types'

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

export const fetchUserAccessToken = () => (dispatch) => {
	API.chrome.getStorage('accessToken')
		.then(response => {
			const accessToken = response.data

			API.gitlab.getUser({accessToken})
				.then(response => {
					let user = {
						accessToken,
						avatarUrl: response.avatar_url,
						name: response.name,
						username: response.username,
						email: response.email
					}

					dispatch({
						type: actionTypes.FETCH_ACCESS_TOKEN,
						data: user
					})
				})
		})
		.catch(error => console.warn('error', error))
}

export const saveUserAccessToken = (accessToken) => (dispatch) => {
	chrome.storage.sync.set({accessToken}, () =>
		dispatch({
			type: actionTypes.SAVE_ACCESS_TOKEN,
			data: accessToken
		})
  )
}

export const fetchIssueBranchName = () => (dispatch) => {
  API.chrome.getCurrentTab()
    .then((tab) => {
      fetchBranchNameAttribute(tab.id)
        .then((response) => dispatch({
          type: actionTypes.FETCH_ISSUE_BRANCH_NAME,
          data: response
        }))
    })
}
