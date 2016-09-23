import Chrome from './chrome'

class FavoritesAPI {
	static get() {console.log('GET');
    return Chrome.getStorage('projects')
	}

	static remove({accessToken}) {

	}

	static create({project}) {
    return FavoritesAPI.get()
      .then(response => {
        const projects = response.data

        console.log('CREATE', projects)
      })
	}
}

export default FavoritesAPI
