import React, { PropTypes, PureComponent } from 'react'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import Project from './Project'
import { actions } from 'store'
import { getIsProjectPinned } from 'store/selectors'

const ItemTypes = {
  PROJECT: 'project'
}

const projectSource = {
  beginDrag({ data: { id } }) {
    return { id };
  },

  canDrag({ pinned }) {
    return pinned;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ProjectDragContainer extends PureComponent {
  render () {
    const { connectDragSource, isDragging, data, pinned, onPin, onUnpin } = this.props

    return connectDragSource(
      <div className='item App__Projects_Item'>
        <Project
          {...this.props}
          style={{
            opacity: isDragging ? 0.5 : 1
          }}
        />
      </div>
    )
  }
}

ProjectDragContainer.propTypes = {
  data: PropTypes.object,
  connectDragSource: PropTypes.func
}

ProjectDragContainer.defaultProps = {
  style: {}
}

const mapStateToProps = (state, props) => ({
  pinned: getIsProjectPinned(state, props.data)
})

const mapDispatchToProps = ({
  onOpenTab: actions.openTab,
  onPin: actions.pinProject,
  onUnpin: actions.unpinProject
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DragSource(ItemTypes.PROJECT, projectSource, collect)(ProjectDragContainer),
);
