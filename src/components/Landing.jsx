import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Landing = () => (
  <div style={{height: 50}}>
    <Dimmer active inverted>
      <Loader />
    </Dimmer>
  </div>
)

Landing.propTypes = {
}

export default Landing
