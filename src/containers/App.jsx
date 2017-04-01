import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { AppWrapper, Landing } from 'components'
import { getSelectedPage } from 'store/selectors'
import { Pages } from 'constants'
import AccessToken from './AccessToken'
import Main from './Main'

class AppContainer extends PureComponent {
  componentDidMount () {
    this.props.onLoad()
  }

  renderPage = () => {
    const { page } = this.props

    switch (page) {
      case Pages.landing:
        return <Landing />
      case Pages.accessToken:
        return <AccessToken />
      case Pages.NEW_ISSUE:
      case Pages.search:
      case Pages.main:
        return <Main />

      default:
        return <Landing />;
    }
  }

  render () {
    return (
      <AppWrapper>
        {this.renderPage()}
      </AppWrapper>
    )
  }
}

const mapStateToProps = state => ({
  page: getSelectedPage(state)
})

const mapDispatchToProps = ({
  onLoad: actions.load
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
