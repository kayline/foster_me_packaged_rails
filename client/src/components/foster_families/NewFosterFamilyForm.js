import React, { Component } from 'react'
import { Form, Button, Header } from 'semantic-ui-react'
import AnimalFormFields from '../animals/AnimalFormFields.js'

class NewFosterFamilyForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			family: {
				active: true,
				animals: [{key: 1}]
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
		const updatedAnimals = [...this.state.family.animals, {key: nextAnimalKey}]
		const updatedFamily = {...this.state.family, ...{animals: updatedAnimals}}
		this.setState({family: updatedFamily, animalCount: nextAnimalKey})
	}

	onFormSubmit = () => {
		this.props.handleSubmit(this.state.family)
	}

	render() {
		return (
			<Form className="new-family-form" onSubmit={this.onFormSubmit}>
		    <Form.Input onChange={this.handleFamilyFieldChanged} label="Family Name" name="name" className="family-name" placeholder='Family Name' />
		    <Form.Checkbox onChange={this.handleFamilyFieldChanged} checked={this.state.family.active} name="active" className="active" label='Currently Fostering' />
	    	<Header size="small">Animals in the Family</Header>
	    	{this.state.family.animals.map(animal => {
	    		return <AnimalFormFields className="animal-form-fields" key={animal.key} animalKey={animal.key} onChange={this.handleAnimalFieldChanged} />
	    	})}
		    
		    <Button className="add-animal-button" type="button" onClick={this.addEmptyAnimal} >Add Another Animal</Button>
		    <Button className="new-family-submit" primary type='submit'>Submit</Button>
			</Form>
		)
	}
}

export default NewFosterFamilyForm