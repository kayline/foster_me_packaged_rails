import React, { Component } from 'react'
import moment from 'moment'
import { Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const DEFAULT_DATE_OF_BIRTH = moment().startOf('year')

class AnimalFormFields extends Component {
	constructor(props) {
		super(props)
		this.state = {
			animal: {
				key: props.animalKey,
				date_of_birth: DEFAULT_DATE_OF_BIRTH
			}
		}
	}

	onFieldChange = (event, {name, value}) => {
		const animal = this.state.animal
		var newValues = {}

		newValues[name] = value

		const updatedAnimal = {...animal, ...newValues}
		this.setState({animal: updatedAnimal})
		this.props.onChange(updatedAnimal)
	}

	handleDOBFieldChange = (selectedDate, event) => {
		const transformedArgs =  {name: "date_of_birth", value: selectedDate}
		this.onFieldChange(event, transformedArgs)
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
	    	<Form.Field onChange={this.handleDOBFieldChange} label="Date of Birth" control={DatePicker} selected={this.state.animal.date_of_birth} className="animal-date-of-birth" name="date_of_birth"/>
	    </div>
		)
	}
}

export default AnimalFormFields