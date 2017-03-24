const storage = ({
  get: (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (response) => {
        const data = response[key]

        if (!data) reject(new Error(`Key ${key} not found on storage`))

        return resolve(data)
      })
    })
  },
  set: (key, data) => {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: data }, resolve)
    })
  }
})

export default {
  storage
}
