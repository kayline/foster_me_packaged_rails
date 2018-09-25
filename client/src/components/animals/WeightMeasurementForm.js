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
		this.props.onSubmit(this.state)
	}

	render() {
		return (
			<Form className="new-weight-measurement-form" onSubmit={this.handleSubmit}>
				<Form.Input
					onChange={this.handleFormChange} 
					name="weight" 
					className="new-weight-measurement" 
					label="Weight (in grams)"
				/>
				<Button className="new-weight-measurement-submit" primary type='submit'>Submit</Button>
			</Form>
		)
	}
}

export default WeightMeasurementForm