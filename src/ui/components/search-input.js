import React from 'react'
import cn from 'classnames'

const styles = {
  container: {flexGrow: 1},
}

let timeToSubmit

const SearchInput = (props) => {
  const handleOnKeyPress = (evt) => {
    if (evt.key === 'Enter')
      props.onSubmit(evt.target.value)
  }

  const handleOnChange = (evt) => {
    const {value} = evt.target

    clearTimeout(timeToSubmit)

    timeToSubmit = setTimeout(() => {
      props.onSubmit(value)
    }, 900)
  }

  return (
    <div
      style={styles.container}
      className={cn('ui icon input', {loading: props.loading})}
    >
      <i className='search icon'></i>
      <input
        autoFocus
        type='text'
        placeholder={props.placeholder}
        onKeyPress={handleOnKeyPress}
        onChange={handleOnChange}
      />
    </div>
  )
}

SearchInput.propTypes = {
  onSubmit: React.PropTypes.func,
}

SearchInput.defaultProps = {
  onSubmit: () => 1
}

module.exports = SearchInput
