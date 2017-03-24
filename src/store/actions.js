import { createAction } from 'redux-actions'

export const load = createAction('LOAD')
export const setPage = createAction('SET_PAGE')
export const updateEntity = createAction('UPDATE_ENTITY')

export const getPersonalToken = createAction('GET_PERSONAL_TOKEN')
export const removeToken = createAction('REMOVE_TOKEN')
export const removeTokenSuccess = createAction('REMOVE_TOKEN_SUCCESS')

export const requestLocalUser = createAction('REQUEST_LOCAL_USER')
export const requestLocalUserError = createAction('REQUEST_LOCAL_USER_ERROR')
export const requestLocalUserSuccess = createAction('REQUEST_LOCAL_USER_SUCCESS')

export const requestUser = createAction('REQUEST_USER')
export const requestUserError = createAction('REQUEST_USER_ERROR')
export const requestUserSuccess = createAction('REQUEST_USER_SUCCESS')

export const initProjects = createAction('INIT_PROJECTS')
export const requestProjects = createAction('REQUEST_PROJECTS')
export const requestProjectsError = createAction('REQUEST_PROJECTS_ERROR')
export const requestProjectsSuccess = createAction('REQUEST_PROJECTS_SUCCESS')

export const initSearchProjects = createAction('INIT_SEARCH_PROJECTS')
export const searchProjects = createAction('SEARCH_PROJECTS')
export const searchProjectsError = createAction('SEARCH_PROJECTS_ERROR')
export const searchProjectsSuccess = createAction('SEARCH_PROJECTS_SUCCESS')

export const openProject = createAction('OPEN_PROJECT')
