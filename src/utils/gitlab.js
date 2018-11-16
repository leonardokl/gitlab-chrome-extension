import axios from 'axios'

// Pathname::Object -> String
const Pathname = (params) => {
  return Object.keys(params)
    .reduce((acc, currValue) => {
      const param = `${currValue}=${params[currValue]}`

      return acc
        ? `${acc}&${param}`
        : `?${param}`
    },  '')
}

const gitlab = {
  get: (apiUrl, resource, { pathname }) => {
    return axios.get(`${apiUrl}/${resource}${Pathname(pathname)}`)
  },

  post: (apiUrl, resource, { pathname }) => {
    return axios.post(`${apiUrl}/${resource}${Pathname(pathname)}`)
  },

  delete: (apiUrl, resource, { pathname }) => {
    return axios.delete(`${apiUrl}/${resource}${Pathname(pathname)}`)
  }
}

const fetchUser = (apiUrl, private_token) => {
  return gitlab.get(apiUrl, 'user', { pathname: { private_token } })
}

const fetchProjects = ({ apiUrl, accessToken, page }) => {
  return gitlab.get(apiUrl, 'projects', {
    pathname: { page, private_token: accessToken, per_page: 10, membership: true }
  })
}

const searchProjects = ({ apiUrl, accessToken, page, query }) => {
  return gitlab.get(apiUrl, 'projects', {
    pathname: { page, private_token: accessToken, per_page: 10, search: query, membership: true }
  })
}

const fetchTodos = ({ apiUrl, accessToken, page }) => {
  return gitlab.get(apiUrl, 'todos', {
    pathname: { page, private_token: accessToken, per_page: 10 }
  })
}

const markAsDone = ({ apiUrl, accessToken, id }) => {
  return gitlab.post(apiUrl, `todos/${id}/mark_as_done`, {
    pathname: { private_token: accessToken }
  })
}

const createIssue = ({ apiUrl, assignee_id, accessToken, id, title, description = '' }) => {
  const defaultPathname = {
    private_token: accessToken,
    description: encodeURI(description),
    title: encodeURI(title)
  }
  const pathname = assignee_id
    ? ({ ...defaultPathname, assignee_id })
    : defaultPathname

  return gitlab.post(apiUrl, `projects/${id}/issues`, { pathname })
}

export default {
  fetchUser,
  fetchProjects,
  fetchTodos,
  searchProjects,
  createIssue,
  markAsDone
}
