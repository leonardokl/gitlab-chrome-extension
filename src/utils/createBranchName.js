import pipe from 'lodash/fp/pipe'
import toLower from 'lodash/toLower'
import replace from 'lodash/fp/replace'
import diacritics from 'diacritics'

const convertSpecialCharactersToSpace = replace(/([^\w\s])/ig, ' ')
const convertSpacesToDash = replace(/\s+/g, '-')
const addId = id => s => `${id}-${s}`
const normalizeDashes = replace(/-+/g, '-')
const removeLastDash = replace(/-$/, '')

const createBranchName = (id, text) => pipe(
  diacritics.remove,
  convertSpecialCharactersToSpace,
  convertSpacesToDash,
  addId(id),
  normalizeDashes,
  removeLastDash,
  toLower
)(text)

export default createBranchName
