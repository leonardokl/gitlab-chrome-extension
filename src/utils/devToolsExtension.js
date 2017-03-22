import identity from 'lodash/identity'

const devToolsExtension = () => window.devToolsExtension
  ? window.devToolsExtension()
  : identity

export default devToolsExtension
