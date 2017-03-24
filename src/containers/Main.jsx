import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUser } from 'store/selectors'

const Main = ({ user }) => (
  <div>{user.name}</div>
)

Main.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: getUser(state)
})

export default connect(mapStateToProps)(Main)
