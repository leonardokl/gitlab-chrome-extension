const when = (condition, callback) => condition
  ? callback()
  : null

export default when
