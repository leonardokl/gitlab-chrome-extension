import React, { PropTypes, PureComponent } from 'react'
import { Button, Checkbox, Input, Icon, Form, TextArea } from 'semantic-ui-react'
import FadeTransition from './FadeTransition'
import { preventDefault } from 'utils'
import './NewIssue.styl'

class NewIssue extends PureComponent {
  state = {
    title: '',
    description: '',
    assignToMe: false
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value})
  }

  handleSubmit = preventDefault(() => {
    this.props.onSubmit(this.state)
  })

  toggleAssignToMe = () => {
    const { assignToMe } = this.state

    this.setState({ assignToMe: !assignToMe })
  }

  render () {
    const { title, description } = this.state
    const { loading, onExternal } = this.props

    return (
      <FadeTransition className='NewIssue'>
        <Form className='NewIssue_Form' onSubmit={this.handleSubmit}>
          <div className='NewIssue_Form_Description'>
            <div style={{ flex: 1 }}>Title</div>
            <Icon
              name='external'
              link
              color='blue'
              title='Open on Gitlab'
              onClick={() => onExternal()}
            />
          </div>
          <Input
            autoFocus
            value={title}
            disabled={loading}
            onChange={this.handleChange('title')}
          />

          <div className='NewIssue_Form_Description'>Description</div>
          <TextArea
            disabled={loading}
            placeholder='Write a comment'
            onChange={this.handleChange('description')}
          />

          <Checkbox
            disabled={loading}
            style={{ marginTop: 5 }}
            label={<label>Assign to me</label>}
            onClick={this.toggleAssignToMe}
          />
        </Form>

        <Button
          positive
          disabled={!title.trim() || loading}
          loading={loading}
          content='Submit issue'
          onClick={this.handleSubmit}
        />
      </FadeTransition>
    )
  }
}

NewIssue.propTypes = {
  loading: PropTypes.bool,
  onExternal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

NewIssue.propTypes = {
  loading: false
}

export default NewIssue
