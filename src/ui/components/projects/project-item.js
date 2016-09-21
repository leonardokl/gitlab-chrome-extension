import React from 'react'
import ListItem from 'ui/components/list/item'
import Icon from 'ui/components/icon'

const ProjectItem = (props) => (
  <ListItem className={props.className} onClick={props.onClick}>
    <div className='projects__item__action right floated content'>
      <div
        className='ui button positive'
        style={{fontSize: '0.8rem'}}
        title={`${props.url}/issues/new?issue`}
        onClick={props.onClickIssue}
      >
        <Icon name='plus' />Issue
      </div>
    </div>
    <div className='header'>
      {`${props.name} `}
      <Icon
        className='projects__item__favorite--hidden'
        name={props.favorite ? 'star' : 'empty star'}
        onClick={props.onClickFavorite}
      />
    </div>
    <div className='description'>{props.nameSpace}</div>
  </ListItem>
)

ProjectItem.propTypes = {
  name: React.PropTypes.string,
  nameSpace: React.PropTypes.string,
  favorite: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onClickIssue: React.PropTypes.func
}

ProjectItem.defaultProps = {
  onClick: () => 1,
  onClickIssue: () => 1
}

module.exports = ProjectItem
