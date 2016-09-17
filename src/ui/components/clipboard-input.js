import React from 'react'
import Clipboard from 'clipboard'

class ClipboardInput extends React.Component {
  componentDidMount() {
    new Clipboard('.btn')
  }

  render() {
      return (
        <div className='input-group'>
          <input id='branch-name' type='text' value={this.props.value} readOnly />
          <span className='input-group-btn'>
            <button
              title='Copy to clipboard'
              className='btn btn-default copy-clipboard'
              data-clipboard-target='#branch-name'
              type='button'
              >
              <span className='glyphicon glyphicon glyphicon-copy' aria-hidden='true'/>
            </button>
          </span>
        </div>
      )
    }
}

export default ClipboardInput
