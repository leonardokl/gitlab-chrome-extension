import Action from './action'
//const styles = require('./css/main.css')
require('./styles/main.styl')
const initApp = () =>	Action.fetchBranchName()

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initApp)
