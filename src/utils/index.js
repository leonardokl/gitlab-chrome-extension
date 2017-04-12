import { GITLAB_URL } from 'constants'

export gitlab from './gitlab'
export chrome from './chrome'
export when from './when'
export stopPropagation from './stopPropagation'
export preventDefault from './preventDefault'
export gitlabTab from './gitlabTab'
export notification from './notification'
export createBranchName from './createBranchName'

export const isGitlabUrl = url => !!url.match(GITLAB_URL)
export const isIssueUrl = url => !!url.match(/\/issues\/\d+$/)
export const getIssueId = url => url.replace(/.*\/issues\/(\d+)$/, '$1')

export const toBadge = value => value
    ? value > 9 ? '+9' : String(value)
    : ''
