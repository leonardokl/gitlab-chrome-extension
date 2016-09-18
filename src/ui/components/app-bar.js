/* global $ */

import React from 'react'
import Avatar from 'ui/components/avatar'

const styles = {
  container: {display: 'flex', 'alignItems': 'center'},
  input: {flexGrow: 1},
  dropdown: {marginLeft: 10},
  dropdownIcon: {margin: 0},
  dropdownMenu: {top: 35, left: -75}
}

class AppBar extends React.Component {
  componentDidMount() {
    const onClickRemoveToken = this.props.onClickRemoveToken

    $(this.dropdown).dropdown({
      onChange: onClickRemoveToken
    })
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.input} className="ui icon input">
          <i className="search icon"></i>
          <input type="text" placeholder="Filter by name..." />
        </div>
        <div
          style={styles.dropdown}
          ref={(el) => (this.dropdown = el)}
          className="ui dropdown"
        >
          <Avatar url={this.props.avatarUrl} /> <i style={styles.dropdownIcon} className="dropdown icon"></i>
          <div style={styles.dropdownMenu} className="menu" >
            <div
              className="item"
            >
              Remove Token
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppBar
