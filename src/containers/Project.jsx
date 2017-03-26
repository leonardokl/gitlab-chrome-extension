import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import curry from 'lodash/fp/curry'
import { Projects } from 'components'
import { actions } from 'store'

class ProjectContainer extends PureComponent {
  handleProjectClick = (project) => () => {
    this.handleAction(project, 'open')
  }

  handleAction = curry((project, action) => {
    const { onOpenTab } = this.props
    const { web_url, default_branch } = project

    switch (action) {
      case 'open':
        return onOpenTab(`${web_url}`)
      case 'newIssue':
        return onOpenTab(`${web_url}/issues/new?issue`)
      case 'code':
        return onOpenTab(`${web_url}/tree/${default_branch}`)
      case 'branches':
        return onOpenTab(`${web_url}/branches`)
      case 'issues':
        return onOpenTab(`${web_url}/issues`)

      default:
        console.error(`Unhandled action ${action}`)
    }
  })

  render () {
    const { data } = this.props

    return (
      <Projects.Item
        name={data.name}
        group={data.namespace.name}
        onClick={this.handleProjectClick(data)}
        onActionClick={this.handleAction(data)}
      />
    )
  }
}

ProjectContainer.propTypes = {
  data: PropTypes.object
}

const mapDispatchToProps = ({
  onOpenTab: actions.openTab
})

export default connect(null, mapDispatchToProps)(ProjectContainer)
