import get from 'lodash/fp/get'

export const getSelectedPage = get('page.selected')
export const getIsValidatingToken = get('page.accessToken.loading')
export const getHasTokenError = get('page.accessToken.error')
