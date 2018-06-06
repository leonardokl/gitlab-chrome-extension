export const Pages = {
  landing: 'LANDING',
  accessToken: 'ACCESS_TOKEN',
  issueBranchName: 'ISSUE_BRANCH_NAME',
  main: 'MAIN',
  error: 'ERROR',
  search: 'SEARCH',
  NEW_ISSUE: 'newIssue',
  TODOS: 'todos'
}

export const GITLAB_URL = 'https://gitlab.com'
export const GITLAB_API_ENDPOINT = 'api/v3'

export const PROJECT_DROPDOWN_OPTIONS = [
  { value: 'code', text: 'Code', icon: 'code' },
  { value: 'branches', text: 'Branches', icon: 'fork' },
  { value: 'issues', text: 'Issues', icon: 'warning circle' },
  { value: 'clone', text: 'Clone', icon: 'clone' }
]

export const GITLAB_TODO_ACTIONS = {
  ASSIGNED: 'assigned',
  MENTIONED: 'mentioned',
  BUILD_FAILED: 'build_failed',
  MARKED: 'marked',
  APPROVAL_REQUIRED: 'approval_required',
}

export const GITLAB_TODO_TYPES = {
  ISSUE: 'Issue',
  MERGE_REQUEST: 'MergeRequest',
}

export const NOTIFICATION_IMAGE = '/public/images/logo-and-name.png'

export const KEY_CODE = {
  SPACE: 32, ESCAPE: 27
}

export default { Pages }
