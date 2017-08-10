import React, { PropTypes } from 'react'
import { Button,  Dropdown} from 'semantic-ui-react'
import { stopPropagation } from 'utils'
import { PROJECT_DROPDOWN_OPTIONS, KEY_CODE } from 'constants'

const IssueButton = ({ onAction }) => (
  <Button.Group positive size='mini'>
    <Button
      positive
      content='Issue'
      icon='plus'
      size='mini'
      aria-label="create issue"
      onKeyDown={stopPropagation((evt) => {
        if (evt.keyCode === KEY_CODE.SPACE) onAction('newIssue')
      })}
      onClick={stopPropagation(() => onAction('newIssue'))}
    />
    <Dropdown floating button>
      <Dropdown.Menu>
          {PROJECT_DROPDOWN_OPTIONS.map((opt, i) =>
            <Dropdown.Item
              {...opt}
              key={i}
              onClick={stopPropagation(() => onAction(opt.value))}
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
