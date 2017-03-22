/* global $ */

import React from 'react'
import  * as GitlabConstants from 'constants/gitlab'
import Avatar from 'ui/components/avatar'
import SearchInput from 'ui/components/search-input'
import Icon from 'ui/components/icon'

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
  dropdownMenu: {top: 35, left: -90, padding: 3}
}

let timeToSubmit

class AppBar extends React.Component {
  componentDidMount() {
    const onClickRemoveToken = this.props.onClickRemoveToken

    $(this.dropdown).dropdown()
  }

  handleOnSubmitSearchInput = (value) => {
    this.props.onChangeFilter(value)
  }

  handleProfileClick = () => {
    const {user} = this.props;

    this.props.onCreateNewChromeTab(`${GitlabConstants.URL}/${user.username}`)
  }

  handleProfileSettingsClick = () => {
    this.props.onCreateNewChromeTab(`${GitlabConstants.URL}/profile`)
  }

  handleRemoveTokenClick = () => {
    this.props.onClickRemoveToken()
  }

  handleOnChangeSearchInput = (evt) => {
    const {value} = evt.target

    this.props.onStartProjectsSearch()
    clearTimeout(timeToSubmit)
    this.props.onFilterProjects(value)
    timeToSubmit = setTimeout(() => {
      this.props.onChangeFilter(value)
    }, 900)
  }

  render() {
    return (
      <div style={styles.container}>
        <SearchInput
          placeholder='Filter by name...'
          loading={this.props.searching}
          onSubmit={this.handleOnSubmitSearchInput}
          onChange={this.handleOnChangeSearchInput}
        />
        <div
          style={styles.dropdown}
          ref={(el) => (this.dropdown = el)}
          className='ui dropdown'
        >
          <Avatar url={this.props.avatarUrl} /> <Icon name='dropdown' style={styles.dropdownIcon} />
          <div style={styles.dropdownMenu} className='menu' >
            <div className='item' onClick={this.handleProfileClick}>
              Profile
            </div>
            <div className='item' onClick={this.handleProfileSettingsClick}>
              Profile Settings
            </div>
            <div className='divider'/>
            <div className='item' onClick={this.handleRemoveTokenClick}>
              Remove Token
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppBar
