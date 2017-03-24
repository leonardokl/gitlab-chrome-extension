import get from 'lodash/fp/get'

export const getSelectedPage = get('page.selected')
export const getIsValidatingToken = get('page.accessToken.loading')
export const getHasTokenError = get('page.accessToken.error')
export const getLoadingUser = get('page.user.loading')
export const getUser = get('user.data')
