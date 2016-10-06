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

export const saveUserAccessTokenRequest = () => (dispatch) => (
	dispatch({
		type: action.SAVE_ACCESS_TOKEN_REQUEST
	})
)

export const saveUserAccessTokenError = () => (dispatch) => (
	dispatch({
		type: action.SAVE_ACCESS_TOKEN_ERROR
	})
)

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

const denormalizeFavoriteProjects = (favoriteProjects) => (
	favoriteProjects.result.map(id => favoriteProjects.projects[id])
)

const fetchStorageFavorites = () => (dispatch) => {
	return new Promise(resolve => {
		API.chrome.getStorage('favorites')
		.then(response => {
			const favoriteProjects = response.data

			dispatch({
				favoriteProjects,
				type: action.FETCH_FAVORITE_PROJECTS,
				denormalizedFavoriteProjects: denormalizeFavoriteProjects(favoriteProjects)
			})
			resolve(response)
		})
		.catch(resolve)
	})
}

const getProjectSchema = (project) => ({
	id: project.id,
	name: project.name,
	nameSpace: project.namespace.name,
	webUrl: project.web_url,
	sshUrl: project.ssh_url_to_repo
})

export const addProjectsLoader = () => (dispatch) => (
	dispatch({type: action.ADD_PROJECTS_LOADER})
)

export const fetchProjectsRequest = () => (dispatch) => (
	dispatch({type: action.FETCH_GITLAB_PROJECTS_REQUEST})
)

const fetchGitlabProjects = () => (dispatch, getState) => {
	const {accessToken} = getState().user
	const favoriteProjects = denormalizeFavoriteProjects(getState().favoriteProjects)

	API.gitlab.fetchProjects({accessToken})
		.then((response) => {
			const projects = response.map(getProjectSchema)

			dispatch({
				type: action.FETCH_GITLAB_PROJECTS,
				data: [...favoriteProjects, ...projects]
			})
		})
		.catch(() => dispatch({
			type: action.FETCH_GITLAB_PROJECTS,
			data: favoriteProjects
		}))
}

export const fetchProjects = () => (dispatch) => {
	dispatch(fetchProjectsRequest())
	dispatch(fetchStorageFavorites())
		.then(() => dispatch(fetchGitlabProjects()))
}

export const fetchFavoriteProjects = () => (dispatch) => (
	dispatch({
		type: action.FETCH_FAVORITE_PROJECTS,
	})
)

const updateFavoritesStorage = (favorites) => {
	return API.chrome.setStorage({favorites})
}

const addProjectToFavorites = (project) => (dispatch, getState) => {
	const {favoriteProjects} = getState()
	const favoriteProjectsUpdate = {
		result: [project.id, ...favoriteProjects.result],
		projects: {...favoriteProjects.projects, [project.id]: project}
	}

	updateFavoritesStorage(favoriteProjectsUpdate)
		.then(() => (
			dispatch({
				type: action.ADD_PROJECT_TO_FAVORITES,
				data: {
					favoriteProjects: favoriteProjectsUpdate
				}
			})
		))
		.catch(error => console.warn(error))
}

const removeProjectFromFavorites = (projectId) => (dispatch, getState) => {
	const {favoriteProjects} = getState()
	const projectIndex = favoriteProjects.result.findIndex(id => id === projectId)
	const favoriteProjectsUpdate = {
		projects: {
			...favoriteProjects.projects,
			[favoriteProjects.result[projectIndex]]: false
		},
		result: [
			...favoriteProjects.result.slice(0, projectIndex),
			...favoriteProjects.result.slice(projectIndex + 1)
		]
	}

	delete favoriteProjectsUpdate.projects[projectId]

	updateFavoritesStorage(favoriteProjectsUpdate)
		.then(() =>
			dispatch({
				type: action.REMOVE_PROJECT_FROM_FAVORITES,
				data: {
					favoriteProjects: favoriteProjectsUpdate
				}
			})
		)
}

const addOrRemoveProjectFromFavorites = (project) => (dispatch, getState) => {
	const {favoriteProjects} = getState()

	if (!favoriteProjects.projects[project.id])
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

export const filterProjects = (projectName) => (dispatch) => (
	dispatch({
		type: action.FILTER_PROJECTS,
		data: {name: projectName}
	})
)

export const searchProjectsRequest = () => (dispatch) => (
	dispatch({
		type: action.SEARCH_GITLAB_PROJECTS_REQUEST
	})
)

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
