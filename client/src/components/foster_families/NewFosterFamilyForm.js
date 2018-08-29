import React, { Component } from 'react'
import { Form, Button, Header } from 'semantic-ui-react'
import AnimalFormFields from '../animals/AnimalFormFields.js'

class NewFosterFamilyForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			family: {
				active: true
			}
		}
	}

	handleFamilyFieldChanged = (event) => {
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

	handleAnimalFieldChanged = (animal) => {
		const family = this.state.family
		family.animals = [animal]
		this.setState({family: family})
	}

	onFormSubmit = () => {
		this.props.handleSubmit(this.state.family)
	}

	render() {
		return (
			<Form className="new-family-form" onSubmit={this.onFormSubmit}>
		    <Form.Input onChange={this.handleFamilyFieldChanged} label="Family Name" name="name" className="family-name" placeholder='Family Name' />
		    <Form.Field onChange={this.handleFamilyFieldChanged} checked={this.state.family.active} control="input" type="checkbox" name="active" className="active" label='Currently Fostering' />
	    	<Header size="small">Animals in the Family</Header>
		    <AnimalFormFields key={1} animalKey={1} onChange={this.handleAnimalFieldChanged} />
		    <Button className="new-family-submit" primary type='submit'>Submit</Button>
			</Form>
		)
	}
}

export default NewFosterFamilyForm