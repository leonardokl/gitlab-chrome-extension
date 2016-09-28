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
          onChangeFilter={this.props.onChangeFilter}
          onFilterProjects={this.props.onFilterProjects}
          onClickRemoveToken={this.props.onRemoveAccessToken}
          searching={projects.searching}
        />
        <Projects
          list={projects.list}
          fetching={projects.fetching}
          favoriteProjects={favoriteProjects}
          onCreateNewChromeTab={this.props.onCreateNewChromeTab}
          onAddProjectToFavorites={this.props.onAddProjectToFavorites}
        />
      </div>
    )
  }
}

export default Main
