/* global chrome */

import API from 'api'
import * as action from 'constants/action-types'

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
				type: action.FETCH_ACCESS_TOKEN,
				data: user
			})
		})
		.catch(error => console.warn('error', error))
}

const saveUserAccessTokenRequest = () => (dispatch) => {
	dispatch({
		type: action.SAVE_ACCESS_TOKEN_REQUEST
	})
}

const saveUserAccessTokenError = () => (dispatch) => {
	dispatch({
		type: action.SAVE_ACCESS_TOKEN_ERROR
	})
}

export const saveUserAccessToken = (accessToken) => (dispatch) => {
	dispatch(saveUserAccessTokenRequest())
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
					type: action.SAVE_ACCESS_TOKEN,
					data: user
				})
			)
		})
		.catch(() => dispatch(saveUserAccessTokenError()))
}

export const removeUserAccessToken = () => (dispatch) => {
	API.chrome.clearStorage()
		.then(() => dispatch({
			type: action.REMOVE_ACCESS_TOKEN,
		}))
}

const fetchStorageProjects = () => (dispatch) => {
	API.chrome.getStorage('projects')
		.then(response => {
			dispatch({
				type: action.FETCH_GITLAB_PROJECTS,
				data: response.data
			})
		})
}

const saveProjectsToStorage = (projects) => {
	API.chrome.setStorage({projects})
}

export const fetchProjects = () => (dispatch, getState) => {
	const state = getState()

	//dispatch(fetchStorageProjects())
	API.gitlab.fetchProjects({accessToken: state.user.accessToken})
		.then((response) => {
			const projects = response.map(project => ({
				id: project.id,
				name: project.name,
				nameSpace: project.namespace.name,
				webUrl: project.web_url,
				sshUrl: project.ssh_url_to_repo
			}))

			dispatch({
				type: action.FETCH_GITLAB_PROJECTS,
				data: projects
			})
			saveProjectsToStorage(projects)
		})
		.catch(() => dispatch({
			type: action.FETCH_GITLAB_PROJECTS,
			data: []
		}))
}

export const fetchFavoriteProjects = () => (dispatch) => {
	dispatch({
		type: action.FETCH_FAVORITE_PROJECTS,
	})
}

const addProjectToFavorites = (project) => (dispatch) => {
	API.favorites.create({project})
		.then(response => (
			dispatch({
				type: action.ADD_PROJECT_TO_FAVORITES,
				data: {
					project,
				}
			})
		))
		.catch(error => console.warn(error))
}

const removeProjectFromFavorites = (projectId) => (dispatch, getState) => {
	const favoriteIds = getState().favoriteProjects.result
	const projectIndex = favoriteIds.findIndex(id => id === projectId)

	dispatch({
		type: action.REMOVE_PROJECT_FROM_FAVORITES,
		index: projectIndex,
	})
}

const addOrRemoveProjectFromFavorites = (project) => (dispatch) => {
	if (project.favorite)
		return dispatch(addProjectToFavorites(project))

	return dispatch(removeProjectFromFavorites(project.id))
}

export const toggleProjectFavorite = (projectId) => (dispatch, getState) => {
	const projectsList = getState().projects.list
	const projectIndex = projectsList.findIndex(project => project.id === projectId)
	const project = {
		...projectsList[projectIndex],
		favorite: !(projectsList[projectIndex].favorite)
	}

	dispatch(addOrRemoveProjectFromFavorites(project))
	dispatch({
		type: action.TOGGLE_PROJECT_FAVORITE,
		data: {
			project,
			index: projectIndex
		}
	})
}

const searchProjectsRequest = () => (dispatch) => {
	dispatch({
		type: action.SEARCH_GITLAB_PROJECTS_REQUEST
	})
}

export const searchProjects = (value) => (dispatch, getState) => {
	const state = getState()
	const {accessToken} = state.user

	if (!value)
		return dispatch(fetchProjects())

	dispatch(searchProjectsRequest())
	API.gitlab.searchProjects({accessToken, value})
		.then(response => {
			const projects = response.map(project => ({
				id: project.id,
				name: project.name,
				nameSpace: project.namespace.name,
				webUrl: project.web_url,
				sshUrl: project.ssh_url_to_repo
			}))

			dispatch({
				type: action.SEARCH_GITLAB_PROJECTS,
				data: projects
			})
		})
		.catch(() => dispatch({
			type: action.SEARCH_GITLAB_PROJECTS,
			data: []
		}))
}

export const createChromeNewTab = (url) => () => {
	chrome.tabs.create({url})
}

export const fetchIssueBranchName = () => (dispatch) => {
  API.chrome.getCurrentTab()
    .then(tab => {
      fetchBranchNameAttribute(tab.id)
        .then((response) => dispatch({
          type: action.FETCH_ISSUE_BRANCH_NAME,
          data: response
        }))
    })
}
