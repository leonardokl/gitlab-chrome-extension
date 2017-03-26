import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUser, getLoadingSearch, getSelectedPage, getTodosCount } from 'store/selectors'
import { FlexItem, TopBar } from 'components'
import { actions } from 'store'
import Projects from './Projects'
import Search from './Search'
import { Pages, GITLAB_URL } from 'constants'

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

  handleNewProjectClick = () => {
    this.props.onOpenTab(`${GITLAB_URL}/projects/new`)
  }

  handleTodosClick = () => {
    this.props.onOpenTab(`${GITLAB_URL}/dashboard/todos`)
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
    const { user, searching, page, todosCount } = this.props

    return (
      <FlexItem fluid>
        <TopBar
          imageUrl={user.avatar_url}
          searching={searching && page !== Pages.search}
          todosCount={todosCount}
          onDropdownClick={this.handleDropdown}
          onSearch={this.handleSearch}
          onTodosClick={this.handleTodosClick}
          onNewProjectClick={this.handleNewProjectClick}
        />
        {this.renderPage()}
      </FlexItem>
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
  page: getSelectedPage(state),
  todosCount: getTodosCount(state)
})

const mapDispatchToProps = ({
  onRemoveToken: actions.removeToken,
  onOpenProfile: actions.openProfile,
  onOpenSettings: actions.openSettings,
  onSearch: actions.loadSearchProjects,
  onOpenTab: actions.openTab
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
