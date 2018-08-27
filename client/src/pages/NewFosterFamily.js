import React, { Component } from 'react'
import { Header, Form, Button } from 'semantic-ui-react'
import PageHeader from '../shared/PageHeader.js'

class NotFound extends Component {
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
		return fetch('/api/foster-families/create', {method: 'post', body: this.state.family})
	}

	render() {
		return (
			<div className="new-foster-family">
				<PageHeader />
				<div className="container new-foster-family-container">
					<Header size="large">Add Your Foster Family</Header>
					<img src="/images/upside-down-cat.jpg" alt="excited-cat"/>
					<Form onSubmit={this.onFormSubmit}>
			    <Form.Field>
			      <label>Family Name</label>
			      <input onChange={this.onFormChange} name="name" className="name" placeholder='Family Name' />
			    </Form.Field>
			    <Form.Field onChange={this.onFormChange} control="input" type="checkbox" name="active" className="active" label='Currently Fostering' />
			    <Button type='submit'>Submit</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default NotFound