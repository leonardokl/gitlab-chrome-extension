const API_URL = 'https://gitlab.com/api/v3'

const getPrivateToken = (accessToken) => `?private_token=${accessToken}`
const addUrlPrefix = (url) => `${API_URL}/${url}`
const createRequestUrl = ({pathname, accessToken}) => (
	addUrlPrefix(pathname) + getPrivateToken(accessToken)
)

class GitlabAPI {
	static getUser({accessToken}) {
		return fetch(createRequestUrl({pathname: 'user', accessToken}))
      .then(response => {
				if (!response.ok)
					throw ({status: response.status, statusText: response.statusText})

				return response.json()
			})
	}
}

export default GitlabAPI
