import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'store/selectors'
import { TopBar } from 'components'
import { actions } from 'store'
import Projects from './Projects'

class MainContainer extends PureComponent {
  handleDropdownClick = (evt, { id }) => {
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

  render () {
    const { user } = this.props

    return (
      <div>
        <TopBar
          imageUrl={user.avatar_url}
          onDropdownClick={this.handleDropdownClick}
        />
        <Projects />
      </div>
    )
  }
}

MainContainer.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: getUser(state)
})

const mapDispatchToProps = ({
  onRemoveToken: actions.removeToken,
  onOpenProfile: actions.openProfile,
  onOpenSettings: actions.openSettings
})

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
