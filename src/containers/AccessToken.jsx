import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { AccessToken } from 'components'
import * as actions from 'store/actions'
import { getIsValidatingToken, getHasTokenError } from 'store/selectors'

const AccessTokenContainer = ({ hasTokenError, isValidatingToken, onRequestUser }) => (
  <AccessToken
    error={hasTokenError}
    loading={isValidatingToken}
    onSave={(accessToken) => onRequestUser({ accessToken })}
  />
)

const mapStateToProps = state => ({
  hasTokenError: getHasTokenError(state),
  isValidatingToken: getIsValidatingToken(state)
})

const mapDispatchToProps = ({
  onRequestUser: actions.requestUser
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessTokenContainer)
