import React from 'react'
import * as ProjectConstants from 'constants/project'
import ListItem from 'ui/components/list/item'
import Icon from 'ui/components/icon'
import ButtonWithDropdown from 'ui/components/button-with-dropdown'

const ProjectItem = (props) => (
  <ListItem className={props.className} onClick={props.onClick}>
    <div className='projects__item__action right floated content'>
      <ButtonWithDropdown
        buttonText='Issue'
        dropdownItems={ProjectConstants.dropdownActions}
        onButtonClick={props.onClickIssue}
        onDropdownClick={props.onActionClick}
      />
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
  onActionClick: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onClickIssue: React.PropTypes.func
}

ProjectItem.defaultProps = {
  onActionClick: () => 1,
  onClick: () => 1,
  onClickIssue: () => 1
}

module.exports = ProjectItem
