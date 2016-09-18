import React from 'react'
import cn from 'classnames'

const styles = {
  container: {flexGrow: 1},
}

const SearchInput = (props) => {
  const handleOnKeyPress = (evt) => {
    if (evt.key === 'Enter')
      props.onSubmit(evt.target.value)
  }

  return (
    <div
      style={styles.container}
      className={cn('ui icon input', {loading: props.loading})}
    >
      <i className='search icon'></i>
      <input
        type='text'
        placeholder={props.placeholder}
        onKeyPress={handleOnKeyPress}
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
