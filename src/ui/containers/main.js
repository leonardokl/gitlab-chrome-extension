import React from 'react'
import AppBar from 'ui/components/app-bar'
import Projects from 'ui/components/projects'

class Main extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const {projects} = this.props
    console.log(projects.list);
    return (
      <div>
        <AppBar
          avatarUrl={this.props.user.avatarUrl}
          onClickRemoveToken={this.props.onRemoveAccessToken}
        />
        <Projects list={projects.list}/>
      </div>
    )
  }
}

export default Main
