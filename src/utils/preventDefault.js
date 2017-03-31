import curry from 'lodash/fp/curry'

const preventDefault = curry((callback, evt, ...args) => {
  evt.preventDefault()
  callback(evt, ...args)
})

export default preventDefault
