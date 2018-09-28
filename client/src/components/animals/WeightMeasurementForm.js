import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class WeightMeasurementForm extends Component {
	constructor(props) {
		super(props)
		this.state= {weight: undefined}
	}

	handleFormChange = (event, {name, value}) => {
		const newState= {}
		newState[name] = value
		this.setState(newState)
	}

	handleSubmit = () => {
		const weightParams = {...this.state, ...{animal_id: this.props.animalId}}
		const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
		return fetch('/api/weight_measurements', {
			method: 'post', 
			headers: headers, 
			body: JSON.stringify(weightParams)
		})
	}

	render() {
		return (
			<Form className="new-weight-measurement-form" onSubmit={this.handleSubmit}>
				<Form.Input
					onChange={this.handleFormChange} 
					name="weight_in_grams" 
					className="new-weight-measurement" 
					label="Weight (in grams)"
				/>
				<Button className="new-weight-measurement-submit" primary type='submit'>Submit</Button>
			</Form>
		)
	}
}

export default WeightMeasurementForm