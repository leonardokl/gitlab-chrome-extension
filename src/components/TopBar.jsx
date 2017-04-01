import React, { PropTypes, PureComponent } from 'react'
import { Dropdown, Icon, Image, Input } from 'semantic-ui-react'
import Search from './Search'
import TodosCounter from './TodosCounter'
import './TopBar.styl'

class TopBar extends PureComponent {
  render () {
    const {
      back,
      description,
      imageUrl,
      search,
      title,
      searching,
      todosCount,
      onBack,
      onDropdownClick,
      onNewProjectClick,
      onTodosClick
    } = this.props
    const DropdownTrigger = (
      <span>
        <Image
          avatar
          src={imageUrl}
        />
      </span>
    )
    const dropdownOptions = [
      { id: 'profile', text: 'Profile' },
      { id: 'settings', text: 'Settings' },
    ]

    return (
      <div className='App__TopBar'>
        <div className='App__TopBar_Content'>
          {back &&
            <Icon
              name='chevron left'
              link
              style={{ marginRight: 10 }}
              onClick={onBack}
            />
          }
          {!!title &&
            <div className='App__TopBar_Content_Title'>
              <div>{title}</div>
              <div className='NewIssue_Project' title={description}>
                {description}
              </div>
            </div>
          }
          {search &&
            <Search
              loading={searching}
              onSearch={this.props.onSearch}
            />
          }
          <TodosCounter count={todosCount} onClick={onTodosClick}/>
          <Icon
            name='plus'
            size='large'
            title='New project'
            link
            onClick={onNewProjectClick}
          />
          <Dropdown trigger={DropdownTrigger}>
            <Dropdown.Menu>
              {dropdownOptions.map((opt, i) =>
                <Dropdown.Item
                  {...opt}
                  key={i}
                  onClick={onDropdownClick}
                />
              )}
              <Dropdown.Divider />
              <Dropdown.Item
                id='removeToken'
                text='Remove Token'
                onClick={onDropdownClick}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  back: PropTypes.bool,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  search: PropTypes.bool,
  searching: PropTypes.bool,
  todosCount: PropTypes.number,
  onDropdownClick: PropTypes.func,
  onSearch: PropTypes.func,
  onTodosClick: PropTypes.func,
  onNewProjectClick: PropTypes.func
}

export default TopBar
