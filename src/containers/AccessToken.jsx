import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { AccessToken } from 'components'
import * as actions from 'store/actions'
import { getIsValidatingToken, getHasTokenError } from 'store/selectors'

const AccessTokenContainer = ({ hasTokenError, isValidatingToken, onRequestUser, onGetPersonalToken }) => (
  <AccessToken
    error={hasTokenError}
    loading={isValidatingToken}
    onGetPersonalToken={() => onGetPersonalToken()}
    onSave={(accessToken) => onRequestUser({ accessToken })}
  />
)

AccessToken.propTypes = {
  hasTokenError: PropTypes.bool,
  isValidatingToken: PropTypes.bool,
  onRequestUser: PropTypes.func,
  onGetPersonalToken: PropTypes.func
}

const mapStateToProps = state => ({
  hasTokenError: getHasTokenError(state),
  isValidatingToken: getIsValidatingToken(state)
})

const mapDispatchToProps = ({
  onRequestUser: actions.requestUser,
  onGetPersonalToken: actions.getPersonalToken
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessTokenContainer)
