import React, { PropTypes, PureComponent } from 'react'
import debounce from 'lodash/debounce'
import { Icon, Input } from 'semantic-ui-react'

class Search extends PureComponent {
  state = {
    value: ''
  }

  handleSearch = debounce(() => {
    this.props.onSearch(this.state.value)
  }, 300)

  handleClose = () => {
    this.setState({ value: '' }, () => {
      this.props.onSearch(this.state.value)
    })
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
