import Action from "./action";
const styles = require('./css/main.css');

const initApp = () => {
	Action.fetchBranchName();
};

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initApp);
