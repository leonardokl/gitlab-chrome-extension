import React, { PropTypes, PureComponent } from 'react'
import { Button, List } from 'semantic-ui-react'
import Loading from './Loading'
import Item from './Item'
import './Projects.styl'

class Projects extends PureComponent {
  get hasChildren() {
    return React.Children.count(this.props.children) > 0
  }

  render () {
    const { children, loading, nextPage, onNextPage } = this.props
    const notFoundMessage = `We couldn't find any project`

    return (
      <div className='App__Projects'>
        {loading && !this.hasChildren &&
          <Loading text='Loading projects'/>
        }
        {this.hasChildren &&
          <List divided relaxed selection>
            {children}
          </List>
        }
        {!!nextPage && this.hasChildren &&
          <div className='App__Projects_More'>
            <Button
              basic
              content='More'
              disabled={loading}
              loading={loading}
              onClick={onNextPage}
            />
          </div>
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
