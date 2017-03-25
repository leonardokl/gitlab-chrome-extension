import { createAction } from 'redux-actions'

export const load = createAction('LOAD')
export const setPage = createAction('SET_PAGE')
export const updateEntity = createAction('UPDATE_ENTITY')
export const openProfile = createAction('OPEN_PROFILE')
export const openSettings = createAction('OPEN_SETTINGS')
export const openNewIssue = createAction('OPEN_NEW_ISSUE')

// TOKEN
export const getPersonalToken = createAction('GET_PERSONAL_TOKEN')
export const removeToken = createAction('REMOVE_TOKEN')
export const removeTokenSuccess = createAction('REMOVE_TOKEN_SUCCESS')

// USER
export const requestUser = createAction('REQUEST_USER')
export const requestUserError = createAction('REQUEST_USER_ERROR')
export const requestUserSuccess = createAction('REQUEST_USER_SUCCESS')

// projects
export const openProject = createAction('OPEN_PROJECT')
export const loadProjects = createAction('LOAD_PROJECTS')
export const requestProjects = createAction('REQUEST_PROJECTS')
export const requestProjectsError = createAction('REQUEST_PROJECTS_ERROR')
export const requestProjectsSuccess = createAction('REQUEST_PROJECTS_SUCCESS')

export const loadSearchProjects = createAction('LOAD_SEARCH_PROJECTS')
export const searchProjects = createAction('SEARCH_PROJECTS')
export const searchProjectsError = createAction('SEARCH_PROJECTS_ERROR')
export const searchProjectsSuccess = createAction('SEARCH_PROJECTS_SUCCESS')

export const requestTodos = createAction('REQUEST_TODOS')
