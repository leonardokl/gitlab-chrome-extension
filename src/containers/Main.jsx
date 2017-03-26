import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUser, getLoadingSearch, getSelectedPage } from 'store/selectors'
import { TopBar } from 'components'
import { actions } from 'store'
import Projects from './Projects'
import Search from './Search'
import { Pages } from 'constants'

class MainContainer extends PureComponent {
  renderPage = () => {
    const { page } = this.props

    switch (page) {
      case Pages.search:
        return <Search />
      case Pages.main:
        return <Projects />
    }
  }

  handleDropdown = (evt, { id }) => {
    const { onRemoveToken, onOpenProfile, onOpenSettings } = this.props

    switch (id) {
      case 'removeToken':
        return onRemoveToken()
      case 'profile':
        return onOpenProfile()
      case 'settings':
        return onOpenSettings()

      default:
        console.error(`Unhandled action of id "${id}"`)
    }
  }

  handleSearch = query => {
    this.props.onSearch(query)
  }

  render () {
    const { user, searching, page } = this.props

    return (
      <div>
        <TopBar
          imageUrl={user.avatar_url}
          searching={searching && page !== Pages.search}
          onDropdownClick={this.handleDropdown}
          onSearch={this.handleSearch}
        />
        {this.renderPage()}
      </div>
    )
  }
}

MainContainer.propTypes = {
  user: PropTypes.object,
  searching: PropTypes.bool
}

const mapStateToProps = state => ({
  user: getUser(state),
  searching: getLoadingSearch(state),
  page: getSelectedPage(state)
})

const mapDispatchToProps = ({
  onRemoveToken: actions.removeToken,
  onOpenProfile: actions.openProfile,
  onOpenSettings: actions.openSettings,
  onSearch: actions.loadSearchProjects
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
