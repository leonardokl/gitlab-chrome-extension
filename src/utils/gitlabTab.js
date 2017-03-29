import { GITLAB_URL } from 'constants'
import chrome from './chrome'

const getIssueNewBranchAttribute = (tabId, attribute) => {
  const code = `document.querySelector('#new-branch a').getAttribute('${attribute}')`

  return chrome.executeScript(tabId, { code })
}

const getIssueNewBranchName = (tabId) => {
  return new Promise((resolve, reject) => {
    Promise.all([
      getIssueNewBranchAttribute(tabId, 'title'),
      getIssueNewBranchAttribute(tabId, 'data-original-title')
    ]).then(response => {
      const [title, dataOriginalTitle] = response
      const branchName = title || dataOriginalTitle

      if (!branchName) return reject(new Error(`Branch name not found`))

      return resolve(branchName)
    })
  })
}

export default {
  getIssueNewBranchName,
}
