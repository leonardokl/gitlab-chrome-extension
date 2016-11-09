import React from 'react'
import Ps from 'perfect-scrollbar'
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css'

class PerfectScrollBar extends React.Component {
  componentDidMount() {
    Ps.initialize(this.el)
  }

  componentDidUpdate() {
    Ps.update(this.el)
  }

  render() {
    return (
      <div
        ref={(el) => (this.el = el)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 300,
          overflow: 'auto',
          position: 'relative',
          marginRight: '-10px',
          marginLeft: '-10px',
          paddingRight: 10,
          paddingLeft: 10
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default PerfectScrollBar
