import React from 'react'
import Icon from './icon';

class ButtonWithDropdown extends React.Component {
  componentDidMount() {
    $(this.dropdown).dropdown()
  }

  render() {
    return (
      <div
        className='ui teal buttons positive'
        style={{height: 28}}
      >
        <div
          className='ui button positive'
          style={{fontSize: '0.8rem', padding: '.78571429em 1em'}}
          onClick={this.props.onButtonClick}
        >
          <Icon name='plus' />{this.props.buttonText}
        </div>
        <div
          ref={(el) => (this.dropdown = el)}
          className='ui floating dropdown icon button'
          onClick={(evt) => {evt.stopPropagation()}}
        >
          <Icon name='dropdown' style={{fontSize: '0.8em'}}/>
          <div className='menu'>
            {this.props.dropdownItems.map((item, index) =>
              <div
                key={index}
                className='item'
                onClick={() => this.props.onDropdownClick(item)}
              >
                {item.text}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default ButtonWithDropdown
