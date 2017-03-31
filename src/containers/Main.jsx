import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  getUser,
  getLoadingSearch,
  getSelectedPage,
  getTodosCount,
  getNewIssueProjectNameSpace
} from 'store/selectors'
import { FlexItem, FlexContainer, TopBar, FadeTransition } from 'components'
import { actions } from 'store'
import Projects from './Projects'
import Search from './Search'
import NewIssue from './NewIssue'
import { Pages, GITLAB_URL } from 'constants'

class MainContainer extends PureComponent {
  get isNewIssuePage () {
    return this.props.page === Pages.NEW_ISSUE
  }

  renderPage = () => {
    const { page } = this.props

    switch (page) {
      case Pages.search:
        return <Search />
      case Pages.main:
        return <Projects />
      case Pages.NEW_ISSUE:
        return <NewIssue />
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

  handleBack = () => {
    this.props.onSetPage(Pages.main)
  }

  render () {
    const { user, searching, page, todosCount, newIssueProjectNameSpace } = this.props

    return (
      <FadeTransition style={{ display: 'flex', flex: 1, flexDirection: 'column'}}>
        <TopBar
          title={this.isNewIssuePage ? 'New Issue' : ''}
          description={newIssueProjectNameSpace}
          imageUrl={user.avatar_url}
          searching={searching && page !== Pages.search}
          todosCount={todosCount}
          onDropdownClick={this.handleDropdown}
          back={this.isNewIssuePage}
          search={!this.isNewIssuePage}
          onSearch={this.handleSearch}
          onBack={this.handleBack}
          onTodosClick={this.handleTodosClick}
          onNewProjectClick={this.handleNewProjectClick}
        />
        <FlexContainer fluid>
          {this.renderPage()}
        </FlexContainer>
      </ FadeTransition>
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
  todosCount: getTodosCount(state),
  newIssueProjectNameSpace: getNewIssueProjectNameSpace(state)
})

const mapDispatchToProps = ({
  onRemoveToken: actions.removeToken,
  onOpenProfile: actions.openProfile,
  onOpenSettings: actions.openSettings,
  onSearch: actions.loadSearchProjects,
  onOpenTab: actions.openTab,
  onSetPage: actions.setPage
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
