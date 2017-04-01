import React, { PropTypes, PureComponent } from 'react'
import { Button, Header, Input, Segment, Image } from 'semantic-ui-react'
import FlexContainer from './FlexContainer'
import FadeTransition from './FadeTransition'
import './AccessToken.styl'

class AccessToken extends PureComponent {
  state = {
    value: '',
    loginViaCookie: false
  }

  handleSave = () => {
    const { value } = this.state

    if (value.trim()) this.props.onSave(value)
  }

  handleLoginViaCookie = () => {
    this.setState({ loginViaCookie: true }, this.props.onSave)
  }

  handleInputChange = ({ target: { value }}) => {
    this.setState({ value })
  }

  handleInputKeyPress = ({ key }) => {
    if (key === 'Enter') this.handleSave()
  }

  render () {
    const { loginViaCookie } = this.state;
    const { loading, error, onSave, onGetPersonalToken } = this.props

    return (
      <FlexContainer fluid className='App__AccessToken'>
        <FadeTransition className='App__AccessToken_Content'>
          <Image src='/public/images/logo.png' size='tiny' disabled={loading}/>
          <Segment disabled={loading}>
            <Header
              as='h4'
              textAlign='center'
            >
              Add your Personal Access Token
            </Header>
            <div className='App__AccessToken_Form'>
              <Input
                autoFocus
                fluid
                placeholder='Personal Access Token'
                error={error}
                onChange={this.handleInputChange}
                onKeyPress={this.handleInputKeyPress}
              />
              <Button
                disabled={loading}
                loading={loading && !loginViaCookie}
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
          <div>
            <Button
              disabled={loading}
              loading={loginViaCookie}
              content='Log in via Cookie'
              size='small'
              onClick={this.handleLoginViaCookie}
            />
          </div>
        </FadeTransition>
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
