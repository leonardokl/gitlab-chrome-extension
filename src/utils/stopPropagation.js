import curry from 'lodash/fp/curry'

const stopPropagation = curry((callback, evt, ...args) => {
  evt.stopPropagation()
  callback(evt, ...args)
})

export default stopPropagation
