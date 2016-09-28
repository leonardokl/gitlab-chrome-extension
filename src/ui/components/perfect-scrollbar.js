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
          maxHeight: 300,
          overflow: 'auto',
          position: 'relative'
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default PerfectScrollBar
