import React from 'react'
import AppBar from 'ui/components/app-bar'
import Projects from 'ui/components/projects'

class Main extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const {projects} = this.props

    return (
      <div>
        <AppBar
          avatarUrl={this.props.user.avatarUrl}
          onChangeFilter={this.props.onChangeFilter}
          onClickRemoveToken={this.props.onRemoveAccessToken}
          searching={projects.searching}
        />
        <Projects
          list={projects.list}
          onCreateNewChromeTab={this.props.onCreateNewChromeTab}    
        />
      </div>
    )
  }
}

export default Main
