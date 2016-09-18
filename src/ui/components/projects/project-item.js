import React from 'react'
import ListItem from 'ui/components/list/item'

const ProjectItem = (props) => (
  <ListItem onClick={props.onClick}>
    <div className="projects__item__action right floated content">
      <div
        className="ui button positive"
        style={{fontSize: '0.8rem'}}
        onClick={props.onClickIssue}
      >
        <i className="icon plus"></i>Issue
      </div>
    </div>
    <div className="description">{props.nameSpace}</div>
    <div className="header">{props.name}</div>
  </ListItem>
)

ProjectItem.propTypes = {
  name: React.PropTypes.string,
  nameSpace: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onClickIssue: React.PropTypes.func
}

ProjectItem.defaultProps = {
  onClick: () => 1,
  onClickIssue: () => 1
}

module.exports = ProjectItem
