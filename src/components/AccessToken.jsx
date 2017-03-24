import React, { PropTypes, PureComponent } from 'react'
import { Button, Header, Input } from 'semantic-ui-react'

class AccessToken extends PureComponent {
  state = {
    value: ''
  }

  handleSave = () => {
    const { value } = this.state

    if (value.trim()) this.props.onSave(value)
  }

  handleInputChange = ({ target: { value }}) => {
    this.setState({ value })
  }

  handleInputKeyPress = ({ key }) => {
    if (key === 'Enter') this.handleSave()
  }

  render () {console.log('this.state', this.state);
    const { loading, error, onSave, onGetPersonalToken } = this.props

    return (
      <div className='App__AccessToken'>
        <Header
          as='h4'
          textAlign='center'
        >
          Add your Gitlab Personal Access Token
        </Header>
        <div className='App__AccessToken_Form'>
          <Input
            ref={(el) => (this.input = el)}
            autoFocus
            disabled={loading}
            fluid
            placeholder='Personal Access Token'
            error={error}
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeyPress}
          />
          <Button
            disabled={loading}
            loading={loading}
            primary
            fluid
            icon='save'
            content='Save'
            onClick={this.handleSave}
          />
          <div>
            <a href='#' onClick={onGetPersonalToken}>
              How can you get a Personal Access Token?
            </a>
          </div>
        </div>
      </div>
    )
  }
}

AccessToken.propTypes = {
  error: PropTypes.bool,
  loading: PropTypes.bool,
  onSave: PropTypes.func,
  onGetPersonalToken: PropTypes.func
}

export default AccessToken
