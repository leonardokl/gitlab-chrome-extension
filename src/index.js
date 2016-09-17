import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from 'config/store'
import App from 'ui/app'

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
