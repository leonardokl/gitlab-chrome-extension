const API_URL = 'https://gitlab.com/api/v3'
// https://gitlab.com/api/v3/user?private_token=

const getPrivateToken = (accessToken) => `?private_token=${accessToken}`

class GitlabAPI {
	static getUser({accessToken}) {
		return fetch(`${API_URL}/user${getPrivateToken(accessToken)}`)
      .then(response => response.json())
	}
}

export default GitlabAPI
