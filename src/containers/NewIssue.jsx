import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NewIssue } from 'components'
import * as actions from 'store/actions'
import { getIsCreatingIssue } from 'store/selectors'

const NewIssueContainer = ({ loading, onCreateIssue, onOpenExternalNewIssue }) => (
  <NewIssue
    loading={loading}
    onSubmit={onCreateIssue}
    onExternal={onOpenExternalNewIssue}
  />
)

NewIssueContainer.propTypes = {
  loading: PropTypes.bool,
  onCreateIssue: PropTypes.func,
  onOpenExternalNewIssue: PropTypes.func
}

const mapStateToProps = state => ({
  loading: getIsCreatingIssue(state),
})

const mapDispatchToProps = ({
  onCreateIssue: actions.createIssue,
  onOpenExternalNewIssue: actions.openExternalNewIssue
})

export default connect(mapStateToProps, mapDispatchToProps)(NewIssueContainer)
