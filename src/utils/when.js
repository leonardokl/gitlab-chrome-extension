import curry from 'lodash/fp/curry'

const when = curry((condition, callback) => condition
  ? callback()
  : null
)

export default when
