import React, { PropTypes, PureComponent } from 'react'
import { Button, Input, Form, TextArea } from 'semantic-ui-react'
import './NewIssue.styl'

class NewIssue extends PureComponent {
  state = {
    title: '',
    description: ''
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value})
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  render () {
    const { title, description } = this.state
    const { loading } = this.props

    return (
      <div className='NewIssue'>
        <Form className='NewIssue_Form'>
          <div className='NewIssue_Form_Description'>Title</div>
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
        </Form>
        <Button
          positive
          disabled={!title.trim() || loading}
          content='Submit issue'
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

NewIssue.propTypes = {

}

export default NewIssue
