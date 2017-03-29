import React, { PropTypes, PureComponent } from 'react'
import Clipboard from 'clipboard'
import { Icon, Button, Divider, Popup } from 'semantic-ui-react'

class IssueMessage extends PureComponent {
  componentDidMount() {
    new Clipboard('#clipboard');
  }

  render() {
    const { title, branchName, onAction } = this.props
    const ClipboardButton = (
      <Button
        id='clipboard'
        basic
        icon='clipboard'
        data-clipboard-text={`git checkout -b ${branchName}`}
      />
    )

    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 0, alignItems: 'center', padding: 10}}>
          <div style={{ flex: 1, alignSelf: 'center' }}>
            <Icon style={{ fontSize: '1.2em'}} name='warning circle' color='green'/><span><strong>{title}</strong></span><br/>
            <div style={{ marginLeft: '1.2em', color: '#757575'}}>
              {branchName}
            </div>
          </div>
          <div>
            <Popup
              trigger={ClipboardButton}
              content='Copy branch name to clipboard'
              position='left center'
              inverted
              size='tiny'
            />
          </div>
        </div>
        <Divider style={{ margin: 0}}/>
      </div>
    )
  }
}

IssueMessage.propTypes = {
  title: PropTypes.string,
  branchName: PropTypes.string,
  onAction: PropTypes.func
}

export default IssueMessage
