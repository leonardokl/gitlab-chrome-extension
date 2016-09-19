import React from 'react'
import cn from 'classnames'

const GITLAB_URL_PERSONAL_TOKEN = 'https://gitlab.com/profile/personal_access_tokens'
const styles = {
  header: {marginBottom: 10, color: 'rgba(45, 45, 45, 0.87)', textAlign: 'center'},
  buttons: {marginTop: 10},
  saveButton: {width: '100%'},
  footer: {marginTop: 10, textAlign: 'center'}
}

class AccessToken extends React.Component {
  handleOnClickSave = () => {
    const accessToken = this.input.value;

    if (accessToken)
      this.props.onSave(accessToken)
  }

  handleOnClickGetAPersonalToken = () => {
    this.props.onCreateNewChromeTab(GITLAB_URL_PERSONAL_TOKEN)
  }

  render() {
    return (
      <div>
        <h4 style={styles.header} className='ui header'>Add your Gitlab Personal Access Token</h4>
        <div className='ui input max-width'>
          <input
            ref={(el) => (this.input = el)}
            type='text'
            placeholder='Personal Access Token'
            />
        </div>
        <div style={styles.buttons}>
          <button
            style={styles.saveButton}
            className={cn('ui primary button', {loading: this.props.loading})}
            onClick={this.handleOnClickSave}
          >
            <i className='save icon'></i>
            Save
          </button>
        </div>
        <div style={styles.footer}>
          <a href='#' onClick={this.handleOnClickGetAPersonalToken}>
            How can you get a Personal Access Token?
          </a>
        </div>
      </div>
    )
  }
}

AccessToken.propTypes = {
  onClick: React.PropTypes.func,
}

AccessToken.defaultProps = {
  onClick: () => 1
}

export default AccessToken
