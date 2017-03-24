import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'store/selectors'
import { TopBar } from 'components'
import { actions } from 'store'

class Main extends PureComponent {
  handleDropdownClick = (evt, { id }) => {
    switch (id) {
      case 'removeToken':
        return this.props.onRemoveToken()

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
      </div>
    )
  }
}

Main.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: getUser(state)
})

const mapDispatchToProps = ({
  onRemoveToken: actions.removeToken
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
