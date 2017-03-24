import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Landing = () => (
  <div style={{height: 50}}>
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  </div>
)

export default Landing
