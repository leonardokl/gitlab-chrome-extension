import Action from './controllers/action'
import './styles/main.styl'

const initApp = () =>	Action.fetchBranchName()

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initApp)
