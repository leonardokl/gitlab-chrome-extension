import React, { PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'
import './NotFound.styl'

const NotFound = ({ query }) => (
  <div className='App__Projects_NotFound'>
    <Icon name={query ? 'search' : 'warning circle'} size='big'/>
    {query
      ? <div>We couldn't find any project <br/>matching <span className='query'>{query}</span></div>
      : <div>We couldn't find any project</div>
    }
  </div>
)

NotFound.propTypes = {
  query: PropTypes.string
}

export default NotFound
