import React, { PropTypes } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import './Loading.styl'

const Loading = ({ text }) => (
  <div className='App__Projects_Loading'>
      <Loader active>{text}</ Loader>
  </div>
)

Loading.propTypes = {
  text: PropTypes.string
}

export default Loading
