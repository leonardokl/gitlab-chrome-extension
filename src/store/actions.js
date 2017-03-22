import { createAction } from 'redux-actions'

export const load = createAction('LOAD')

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
