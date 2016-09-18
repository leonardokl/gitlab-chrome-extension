/* global chrome */

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
	API.chrome.getStorage('user')
		.then(response => {
			const user = response.data

			dispatch({
				type: actionTypes.FETCH_ACCESS_TOKEN,
				data: user
			})
		})
		.catch(error => console.warn('error', error))
}

export const saveUserAccessToken = (accessToken) => (dispatch) => {
	API.gitlab.getUser({accessToken})
		.then(response => {
			const user = {
				accessToken,
				avatarUrl: response.avatar_url,
				name: response.name,
				username: response.username,
				email: response.email
			}

			chrome.storage.sync.set({user}, () =>
				dispatch({
					type: actionTypes.SAVE_ACCESS_TOKEN,
					data: user
				})
			)
		})
		.catch(error => console.warn('saveUserAccessToken', error))
}

export const removeUserAccessToken = () => (dispatch) => {
	API.chrome.clearStorage()
		.then(() => dispatch({
			type: actionTypes.REMOVE_ACCESS_TOKEN,
		}))
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
