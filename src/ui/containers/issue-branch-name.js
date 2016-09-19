import React from 'react'
import ClipboardInput from 'ui/components/clipboard-input'

const IssueBranchName = (props) => (
  <div>
    <h4 className='ui header title'>Copy branch name</h4>
    <ClipboardInput
      value={`git checkout -b ${props.branchName}`}
    />
  </div>
)

IssueBranchName.propTypes = {
  branchName: React.PropTypes.string,
}

module.exports = IssueBranchName
