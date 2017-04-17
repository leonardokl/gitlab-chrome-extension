import React, { PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'
import './NotFound.styl'

const NotFound = ({ message, query }) => (
  <div className='App__Projects_NotFound'>
    <Icon name={query ? 'search' : 'warning circle'} size='big'/>
    {query
      ? <div>{message} <br/>matching <span className='query'>{query}</span></div>
      : <div>{message}</div>
    }
  </div>
)

NotFound.propTypes = {
  message: PropTypes.string,
  query: PropTypes.string
}

NotFound.defaultProps = {
  message: `We couldn't find any project`
}

export default NotFound
