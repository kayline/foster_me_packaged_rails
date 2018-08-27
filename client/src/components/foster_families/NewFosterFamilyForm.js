import React, { Component } from 'react'
import { Header, Form, Button } from 'semantic-ui-react'

class NewFosterFamilyForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			family: {
			}
		}
	}

	onFormChange = (event) => {
	const family = this.state.family
	var newValues = {}

		if(event.target.type === "checkbox") {
			newValues[event.target.name] = event.target.checked
		} else {
			newValues[event.target.name] = event.target.value
		}

		const updatedFamily = {...family, ...newValues}
		this.setState({family: updatedFamily})
	}

	onFormSubmit = () => {
		this.props.handleSubmit(this.state.family)
	}

	render() {
		return (
			<Form className="new-family-form" onSubmit={this.onFormSubmit}>
		    <Form.Field>
		      <label>Family Name</label>
		      <input onChange={this.onFormChange} name="name" className="name" placeholder='Family Name' />
		    </Form.Field>
		    <Form.Field onChange={this.onFormChange} control="input" type="checkbox" name="active" className="active" label='Currently Fostering' />
		    <Button type='submit'>Submit</Button>
			</Form>
		)
	}
}

export default NewFosterFamilyForm