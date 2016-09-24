/* global $ */

import React from 'react'
import Avatar from 'ui/components/avatar'
import SearchInput from 'ui/components/search-input'

const styles = {
  container: {
    backgroundColor: '#FAFAFA',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    margin: '-10px -10px 0 -10px',
    padding: 10
  },
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

  handleOnSubmitSearchInput = (value) => {
    this.props.onChangeFilter(value)
  }

  render() {
    return (
      <div style={styles.container}>
        <SearchInput
          placeholder='Filter by name...'
          loading={this.props.searching}
          onSubmit={this.handleOnSubmitSearchInput}
        />
        <div
          style={styles.dropdown}
          ref={(el) => (this.dropdown = el)}
          className='ui dropdown'
        >
          <Avatar url={this.props.avatarUrl} /> <i style={styles.dropdownIcon} className='dropdown icon'></i>
          <div style={styles.dropdownMenu} className='menu' >
            <div
              className='item'
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
