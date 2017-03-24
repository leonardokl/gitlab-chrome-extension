import React, { PropTypes, PureComponent } from 'react'
import { Button } from 'semantic-ui-react'

class Projects extends PureComponent {
  render () {
    const { children, loading, nextPage, onNextPage } = this.props
    const notFoundMessage = `We couldn't find any project`

    return (
      <div className='App__Projects'>
        {loading && 'LOADING...'}
        {children}
        {!!nextPage &&
          <Button
            basic
            content='Next'
            disabled={loading}
            loading={loading}
            onClick={onNextPage}
          />
        }
      </div>
    )
  }
}

Projects.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  nextPage: PropTypes.bool,
  onNextPage: PropTypes.func
}

export default Projects
