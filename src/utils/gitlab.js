import axios from 'axios'
import constants from 'constants'

const API_URL = constants.Gitlab.apiUrl

const gitlab = {
  get: (resource, { accessToken }) => {
    return axios.get(`${API_URL}/${resource}?private_token=${accessToken}`)
  }
}

const fetchUser = (accessToken) => gitlab.get('user', { accessToken })
const fetchProjects = (accessToken) => gitlab.get('projects', { accessToken })
const fetchTodos = (accessToken) => gitlab.get('todos', { accessToken })

export default {
  fetchUser,
  fetchTodos,
  fetchTodos
}
