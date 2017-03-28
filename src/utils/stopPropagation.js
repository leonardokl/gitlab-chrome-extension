import curry from 'lodash/fp/curry'

const stopPropagation = curry((callback, evt) => {
  evt.stopPropagation()
  callback(evt)
})

export default stopPropagation
