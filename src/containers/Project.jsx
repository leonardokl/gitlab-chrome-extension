import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import { Projects } from 'components'
import { actions } from 'store'
import { getIsProjectPinned } from 'store/selectors'
import notification from 'utils/notification';
import copyToClipboard from 'utils/copyToClipboard'

class ProjectContainer extends PureComponent {
  handleProjectClick = (project) => () => {
    this.handleAction(project, 'open')
  }

  handleAction = curry((project, action) => {
    const { onOpenTab, onNewIssue } = this.props
    const { web_url, ssh_url_to_repo, default_branch } = project

    switch (action) {
      case 'open':
        return onOpenTab(`${web_url}`)
      case 'newIssue':
        return onNewIssue(project)
      case 'code':
        return onOpenTab(`${web_url}/tree/${default_branch}`)
      case 'branches':
        return onOpenTab(`${web_url}/branches`)
      case 'issues':
        return onOpenTab(`${web_url}/issues`)
      case 'clone':
        copyToClipboard(ssh_url_to_repo)
        notification.basic({
          title: 'URL copied to clipboard!',
          message: ssh_url_to_repo
        })
        return;
      default:
        console.error(`Unhandled action ${action}`)
    }
  })

  render () {
    const { connectDragSource, style, isDragging, data, pinned, onPin, onUnpin } = this.props

    return (
      <Projects.Item
        style={style}
        name={data.name}
        group={data.namespace.full_path}
        pinned={pinned}
        onClick={this.handleProjectClick(data)}
        onActionClick={this.handleAction(data)}
        onPin={() => onPin(data)}
        onUnpin={() => onUnpin(data)}
      />
    )
  }
}

ProjectContainer.propTypes = {
  data: PropTypes.object,
  connectDragSource: PropTypes.func
}

ProjectContainer.defaultProps = {
  style: {}
}

const mapStateToProps = (state, props) => ({
  pinned: getIsProjectPinned(state, props.data)
})

const mapDispatchToProps = ({
  onOpenTab: actions.openTab,
  onNewIssue: actions.newIssue,
  onPin: actions.pinProject,
  onUnpin: actions.unpinProject
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)

