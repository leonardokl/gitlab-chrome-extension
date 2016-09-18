import React from 'react'
import AppBar from 'ui/components/app-bar'
import Avatar from 'ui/components/avatar'

class Main extends React.Component {
  componentDidMount() {
    $(this.dropdown).dropdown()
  }

  render() {
    return (
      <div>
        <AppBar avatarUrl={this.props.user.avatarUrl}/>
          <div className="ui celled selection list">
            {[1,2,3,4,5,6].map((item, index) =>
              <div style={{padding: 10}} key={index} className="item">
                <div className="content">
                  <div className="projects__item__action right floated content">
                    <div style={{fontSize: '0.8rem'}} className="ui button positive">
                      <i className="icon plus"></i>Issue
                    </div>
                  </div>
                  <div className="description">Leonardo Luiz</div>
                  <div className="header">html-scraper-planet-node-js</div>
                </div>
              </div>
            )}
          </div>
      </div>
    )
  }
}

export default Main
