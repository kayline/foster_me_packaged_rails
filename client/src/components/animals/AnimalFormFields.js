import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class AnimalFormFields extends Component {
	constructor(props) {
		super(props)
		this.state = {
			animal: {
				key: props.animalKey
			}
		}
	}

	onFieldChange = (event, {name, value, checked}) => {
		const animal = this.state.animal
		var newValues = {}

		newValues[name] = value

		const updatedAnimal = {...animal, ...newValues}
		this.setState({animal: updatedAnimal})
		this.props.onChange(updatedAnimal)
	}

	render() {
		const sexOptions = [
			{key: "f", text: "Female", value: "Female"}, 
			{key: "m", text: "Male", value: "Male"}
		]

		return (
			<div className="nested-form-fields-container nested-animal-fields">
		    <Form.Input onChange={this.onFieldChange} name="name" className="animal-name" label="Animal Name" placeholder='Animal Name' />
		    <Form.TextArea onChange={this.onFieldChange} label="Description" placeholder='What does this critter look like?' name="description" className="animal-description"/>
	    	<Form.Select onChange={this.onFieldChange} label="Sex" options={sexOptions} placeholder="Sex" name="sex" className="animal-sex" />
	    </div>
		)
	}
}

export default AnimalFormFields