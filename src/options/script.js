var GITLAB_URL_STORAGE_KEY = 'gitlabUrl'
var $preferencesForm = document.getElementById('preferences-form')
var $statusDescription = document.getElementById('status-description')
var $gitlabUrl = document.getElementById('gitlab-url')
var $saveButton = $preferencesForm.querySelector('button')

function getGitlabUrl () {
  return new Promise(function (resolve) {
    chrome.storage.local.get(GITLAB_URL_STORAGE_KEY, function (res) {
      resolve(res[GITLAB_URL_STORAGE_KEY])
    })
  })
}

function setGitlabUrl (gitlabUrl) {
  return new Promise((resolve) => {
    chrome.storage.local.clear()
    chrome.storage.sync.clear()
    chrome.browserAction.setBadgeText({ text: '' })
    chrome.storage.local.set({ [GITLAB_URL_STORAGE_KEY]: gitlabUrl }, resolve)
  })
}

function handleError () {
  $statusDescription.textContent = 'an error ocurred'
}

getGitlabUrl()
  .then(function (gitlabUrl) {
    $gitlabUrl.value = gitlabUrl
    $saveButton.removeAttribute('disabled')
  })
  .catch(handleError)

$preferencesForm.addEventListener('submit', function (evt) {
  evt.preventDefault()

  $statusDescription.textContent = ''
  $saveButton.textContent = 'Saving...'
  $saveButton.setAttribute('disabled', true)

  setGitlabUrl($gitlabUrl.value)
    .then(function () {
      $statusDescription.textContent = 'preferences saved!'
      $saveButton.textContent = 'Save'
      $saveButton.removeAttribute('disabled')
    })
    .catch(handleError)
})
