import React, { PropTypes, PureComponent } from 'react'
import { Button, Header, Input, Segment, Icon, Reveal } from 'semantic-ui-react'
import FlexContainer from './FlexContainer'
import './AccessToken.styl'

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

  render () {
    const { loading, error, onSave, onGetPersonalToken } = this.props

    return (
      <FlexContainer fluid className='App__AccessToken'>
        <div className='App__AccessToken_Content'>
          <Icon name='gitlab' size='huge'/>
          <Segment>
            <Header
              as='h4'
              textAlign='center'
            >
              Add your Personal Access Token
            </Header>
            <div className='App__AccessToken_Form'>
              <Input
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
          </Segment>
        </div>
      </FlexContainer>
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
