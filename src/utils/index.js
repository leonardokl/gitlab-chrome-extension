import { GITLAB_URL } from 'constants'

export gitlab from './gitlab'
export chrome from './chrome'
export when from './when'
export stopPropagation from './stopPropagation'
export gitlabTab from './gitlabTab'
export notification from './notification'

export const isGitlabUrl = url => !!url.match(GITLAB_URL)
export const isIssueUrl = url => !!url.match(/\/issues\/\d+$/)
export const getIssueId = url => url.replace(/.*\/issues\/(\d+)$/, '$1')
