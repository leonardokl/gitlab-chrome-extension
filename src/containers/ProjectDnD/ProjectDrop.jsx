import React, { PropTypes, PureComponent } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import ProjectDrag from './ProjectDrag'
import { actions } from 'store'
import { getIsProjectPinned } from 'store/selectors'

const projectSource = {
  hover({ pinned, data: { id }, onSwapPinnedProjects }, monitor) {
    const draggingProject = monitor.getItem()

    if (pinned && id !== draggingProject.id) {
      onSwapPinnedProjects([id, draggingProject.id])
    }
  },

  canDrop({ pinned, data: { id } }, monitor) {
    const draggingProject = monitor.getItem()

    return pinned && id !== draggingProject.id
  },

  drop({ data: { id }, onSwapPinnedProjects }, monitor) {
    const draggingProject = monitor.getItem()

    onSwapPinnedProjects([id, draggingProject.id])
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class ProjectDrop extends PureComponent {
  render () {
    const { connectDropTarget, isOver, pinned, ...props } = this.props
    const style = isOver && pinned
      ? { backgroundColor: '#ecf4fb' }
      : {}

    return connectDropTarget(
      <div
        className='item App__Projects_Item' style={style}
      >
        <ProjectDrag {...this.props}/>
      </div>
    )
  }
}

ProjectDrop.propTypes = {
  data: PropTypes.object,
  pinned: PropTypes.bool,
  connectDropTarget: PropTypes.func
}

const mapStateToProps = (state, props) => ({
  pinned: getIsProjectPinned(state, props.data)
})

const mapDispatchToProps = ({
  onSwapPinnedProjects: actions.swapPinnedProjects
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DropTarget('project', projectSource, collect)(ProjectDrop),
);
