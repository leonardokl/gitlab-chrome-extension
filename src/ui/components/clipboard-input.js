import React from 'react'
import Clipboard from 'clipboard'

class ClipboardInput extends React.Component {
  componentDidMount() {
    this.addClipboardListener()
  }

  addClipboardListener = () => {
    new Clipboard(this.button)
  }

  render() {
    return (
      <div className='clipboard-input ui action input'>
        <input
          id='branch-name'
          type='text'
          readOnly
          value={this.props.value}
        />
        <button
          ref={(el) => (this.button = el)}
          className='ui icon button'
          data-clipboard-target='#branch-name'
          title='Copy to clipboard'
        >
          <i className='copy icon'></i>
        </button>
      </div>
    )
  }
}

export default ClipboardInput
