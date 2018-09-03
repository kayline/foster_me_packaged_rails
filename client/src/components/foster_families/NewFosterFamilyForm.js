import React, { Component } from 'react'
import moment from 'moment'
import { Form, Button, Divider } from 'semantic-ui-react'
import AnimalFormFields from '../animals/AnimalFormFields.js'
const DEFAULT_DATE_OF_BIRTH = moment().startOf('year')

class NewFosterFamilyForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			family: {
				active: true,
				animals: [{key: 1, date_of_birth: DEFAULT_DATE_OF_BIRTH}]
			},
			animalCount:1
		}
	}

	handleFamilyFieldChanged = (event, {name, value, type, checked}) => {
		const family = this.state.family
		var newValues = {}

		if(type === "checkbox") {
			newValues[name] = checked
		} else {
			newValues[name] = value
		}

		const updatedFamily = {...family, ...newValues}
		this.setState({family: updatedFamily})
	}

	handleAnimalFieldChanged = (animal) => {
		const existingAnimal = this.state.family.animals.find(a => a.key === animal.key)
		
		const updatedAnimal = {...existingAnimal, ...animal}
		const updatedAnimals = this.state.family.animals.map(function(animal) { return animal === existingAnimal ? updatedAnimal : animal })
		const updatedFamily = {...this.state.family, ...{animals: updatedAnimals}}
		this.setState({family: updatedFamily})
	}

	addEmptyAnimal = () => {
		const nextAnimalKey = this.state.animalCount + 1
		const newAnimal = {key: nextAnimalKey, date_of_birth: DEFAULT_DATE_OF_BIRTH}
		const updatedAnimals = [...this.state.family.animals, newAnimal]
		const updatedFamily = {...this.state.family, ...{animals: updatedAnimals}}
		this.setState({family: updatedFamily, animalCount: nextAnimalKey})
	}

	renderFamilyErrors() {
		if(this.props.errors.family.length > 0) {
			return (
				<div className="error create-family-error">{"Family: " + this.props.errors.family.join(', ')}</div>
			)
		}
	}

	renderAnimalsErrors() {
		if(this.props.errors.animals.length > 0) {
			return (
				<div className="error create-animals-error">{"Animals: " + this.props.errors.animals.join(', ')}</div>
			)
		}
	}

	onFormSubmit = () => {
		this.props.handleSubmit(this.state.family)
	}

	render() {
		return (
			<div className="new-family-form-container">
				{this.renderFamilyErrors()}
				<Form className="new-family-form" onSubmit={this.onFormSubmit}>
			    <Form.Input onChange={this.handleFamilyFieldChanged} label="Family Name" name="name" className="family-name" placeholder='Family Name' />
			    <Form.Checkbox onChange={this.handleFamilyFieldChanged} checked={this.state.family.active} name="active" className="active" label='Currently Fostering' />
		    	{this.renderAnimalsErrors()}
		    	{this.state.family.animals.map(animal => {
		    		return <AnimalFormFields className="animal-form-fields" key={animal.key} animal={animal} onChange={this.handleAnimalFieldChanged} />
		    	})}
			    <div>
			    	<Button className="add-animal-button" type="button" onClick={this.addEmptyAnimal} >Add Another Animal</Button>
			    </div>
			    <Divider horizontal>Or</Divider>
			    <Button className="new-family-submit" primary type='submit'>Submit</Button>
				</Form>
			</div>
		)
	}
}

export default NewFosterFamilyForm