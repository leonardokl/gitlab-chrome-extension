import axios from 'axios'
import constants from 'constants'

const API_URL = constants.Gitlab.apiUrl

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
  get: (resource, { pathname }) => {
    return axios.get(`${API_URL}/${resource}${Pathname(pathname)}`)
  }
}

const fetchUser = (private_token) => {
  return gitlab.get('user', { pathname: { private_token } })
}

const fetchProjects = ({ private_token, page }) => {
  return gitlab.get('projects', {
    pathname: { page, private_token, per_page: 10 }
  })
}

const fetchTodos = (private_token) => {
  return gitlab.get('todos', {
    pathname: { private_token, per_page: 10 }
  })
}

export default {
  fetchUser,
  fetchProjects,
  fetchTodos
}
