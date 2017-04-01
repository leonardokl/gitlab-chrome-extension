export const Pages = {
  landing: 'LANDING',
  accessToken: 'ACCESS_TOKEN',
  issueBranchName: 'ISSUE_BRANCH_NAME',
  main: 'MAIN',
  error: 'ERROR',
  search: 'SEARCH',
  NEW_ISSUE: 'newIssue'
}

export const Gitlab = {
  url: 'https://gitlab.com',
  apiUrl: 'https://gitlab.com/api/v3',
  personalTokenUrl: 'https://gitlab.com/profile/personal_access_tokens'
}

export const GITLAB_URL = 'https://gitlab.com'
export const PROJECT_DROPDOWN_OPTIONS = [
  { id: 'code', text: 'Code', icon: 'code' },
  { id: 'branches', text: 'Branches', icon: 'fork' },
  { id: 'issues', text: 'Issues', icon: 'warning circle' }
]

export default {
  Pages,
  Gitlab
}
