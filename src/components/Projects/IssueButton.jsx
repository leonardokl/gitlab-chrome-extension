import React, { PropTypes } from 'react'
import { Button,  Dropdown} from 'semantic-ui-react'
import { stopPropagation } from 'utils'
import { PROJECT_DROPDOWN_OPTIONS } from 'constants'

const IssueButton = ({ onAction }) => (
  <Button.Group positive size='mini'>
    <Button
      positive
      content='Issue'
      icon='plus'
      size='mini'
      onClick={stopPropagation(() => onAction('newIssue'))}
    />
    <Dropdown floating button>
      <Dropdown.Menu>
          {PROJECT_DROPDOWN_OPTIONS.map((opt, i) =>
            <Dropdown.Item
              {...opt}
              key={i}
              onClick={stopPropagation(() => onAction(opt.id))}
            />
          )}
        </Dropdown.Menu>
    </Dropdown>
  </Button.Group>
)

IssueButton.propTypes = {
  onAction: PropTypes.func
}

export default IssueButton
