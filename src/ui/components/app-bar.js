import React from 'react'
import Avatar from 'ui/components/avatar'

class AppBar extends React.Component {
  componentDidMount() {
    $(this.dropdown).dropdown()
  }

  render() {
    return (
      <div style={{display: 'flex', 'alignItems': 'center'}}>
        <div style={{flexGrow: 1}} className="ui icon input">
          <i className="search icon"></i>
          <input type="text" placeholder="Filter by name..." />
        </div>
        <div style={{marginLeft: 10}} ref={(el) => (this.dropdown = el)} className="ui dropdown">
          <Avatar url={this.props.avatarUrl} /> <i style={{margin: 0}} className="dropdown icon"></i>
          <div style={{left: -85}} className="menu">
            <div className="item">Remove Token</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppBar
