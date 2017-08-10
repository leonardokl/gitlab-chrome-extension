import React, { PropTypes, PureComponent } from 'react'
import throttle from 'lodash/throttle'
import { Icon, Input } from 'semantic-ui-react'

class Search extends PureComponent {
  state = {
    value: ''
  }

  handleSearch = throttle(() => {
    this.props.onSearch(this.state.value)
  }, 800)

  handleClose = () => {
    this.setState({ value: '' }, this.handleSearch)
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value }, this.handleSearch)
  }

  handleOnKeyPress = ({ key }) => {
    if (key === 'Enter') this.handleSearch()
  }

  render () {
    const { value } = this.state
    const { loading, onSearch } = this.props
    const SearchIcon = (
      <Icon name='search' link onClick={this.handleSearch} />
    )
    const CloseIcon = (
      <Icon name='close' link onClick={this.handleClose} />
    )

    return (
      <Input
        value={value}
        autoFocus
        fluid
        role="search"
        icon={value ? CloseIcon : SearchIcon}
        loading={loading}
        aria-label="search for projects"
        placeholder='Filter by name'
        onChange={this.handleChange}
        onKeyPress={this.handleOnKeyPress}
      />
    )
  }
}

Search.propTypes = {
  loading: PropTypes.bool,
  onSearch: PropTypes.func
}

export default Search
