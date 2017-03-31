import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NewIssue } from 'components'
import * as actions from 'store/actions'
import { getIsCreatingIssue } from 'store/selectors'

const NewIssueContainer = ({ loading, onCreateIssue }) => (
  <NewIssue loading={loading} onSubmit={onCreateIssue}/>
)

NewIssueContainer.propTypes = {
  onCreateIssue: PropTypes.func,
}

const mapStateToProps = state => ({
  loading: getIsCreatingIssue(state),
})

const mapDispatchToProps = ({
  onCreateIssue: actions.createIssue
})

export default connect(mapStateToProps, mapDispatchToProps)(NewIssueContainer)
