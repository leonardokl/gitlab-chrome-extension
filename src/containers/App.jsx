import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { AppWrapper } from 'components'

class App extends PureComponent {
  componentDidMount () {
    this.props.onLoad()
  }

  render () {
    return (
      <AppWrapper>
        app
      </AppWrapper>
    )
  }
}

const mapDispatchToProps = ({
  onLoad: actions.load
})

export default connect(null, mapDispatchToProps)(App)
