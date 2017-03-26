import React, { PropTypes, PureComponent } from 'react'
import { Button, List } from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import throttle from 'lodash/throttle'
import Loading from './Loading'
import Item from './Item'
import { when } from 'utils'
import './Projects.styl'

class Projects extends PureComponent {
  get hasChildren() {
    return React.Children.count(this.props.children) > 0
  }

  handleScrollLimit = throttle(() => {
    const { loading, nextPage, onNextPage } = this.props

    when(!loading && !!nextPage, onNextPage)
  }, 300)

  handleScroll = ({ top }) => {
    when(top >= 1, this.handleScrollLimit)
  }

  render () {
    const { children, loading, loadingMessage, nextPage, onNextPage } = this.props
    const notFoundMessage = `We couldn't find any project`

    return (
      <Scrollbars className='App__Projects' onScrollFrame={this.handleScroll}>
        {loading && !this.hasChildren &&
          <Loading text={loadingMessage}/>
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
      </Scrollbars>
    )
  }
}

Projects.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  nextPage: PropTypes.bool,
  onNextPage: PropTypes.func,
  onScrollLimit: PropTypes.func
}

export default Projects
