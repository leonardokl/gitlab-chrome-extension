import React from 'react'
import AppBar from 'ui/components/app-bar'
import Projects from 'ui/components/projects'

class Main extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const {projects, favoriteProjects} = this.props

    return (
      <div>
        <AppBar
          avatarUrl={this.props.user.avatarUrl}
          searching={projects.searching}
          onChangeFilter={this.props.onChangeFilter}
          onClickRemoveToken={this.props.onRemoveAccessToken}
          onFilterProjects={this.props.onFilterProjects}
          onStartProjectsSearch={this.props.onStartProjectsSearch}
        />
        <Projects
          list={projects.list}
          fetching={projects.fetching}
          favoriteProjects={favoriteProjects}
          onAddProjectToFavorites={this.props.onAddProjectToFavorites}
          onCreateNewChromeTab={this.props.onCreateNewChromeTab}
        />
      </div>
    )
  }
}

export default Main
