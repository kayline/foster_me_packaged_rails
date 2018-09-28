import React, { Component } from 'react'
import moment from 'moment'
import momentDurationFormatSetup from "moment-duration-format"
import { List } from 'semantic-ui-react'
import WeightMeasurementForm from './WeightMeasurementForm.js'

class Animal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			full_image_url: process.env.REACT_APP_BASE_PHOTO_URL + props.animal.profile_photo_path,
			animal: props.animal
		}
	}
	
	displayAge() {
		return this.props.clock.formattedAge(this.state.animal.date_of_birth)
	}

	weightMessage = () => {
		const weightMeasurement = this.mostRecentWeight()
		var message = null

		if(weightMeasurement !== undefined) {
			message = `Weight: ${weightMeasurement.weight_in_grams} grams, measured ${this.props.clock.timeSinceRecent(weightMeasurement.date)}`
		} else {
			message = "No weight recorded"
		}
		return(
				<div className="weight">{message}</div>
		)
	}

	mostRecentWeight = () => {
		return this.state.animal.weight_measurements.sort((a,b) => {
			return moment(a.date) <= moment(b.date)
		})[0]
	}

	addWeightMeasurement = (newWeightMeasurement) => {
		const updatedWeights = [...this.state.animal.weight_measurements, newWeightMeasurement]
		const updatedAnimal = {...this.state.animal, ...{weight_measurements: updatedWeights}}
		this.setState({animal: updatedAnimal})
	}

	render() {
		return (
				<List.Item className="animal-list">
					<List.Content floated="right">
						<img 
							src={this.state.full_image_url}
							floated="right" 
							className="animal-pic" 
							alt={this.state.animal.name} 
						/>
					</List.Content>
					<div className="name">My name is {this.state.animal.name}</div>
					<div>{this.state.animal.description}</div>
					<div>Age: {this.displayAge()}</div>
					<div>Sex: {this.state.animal.sex}</div>
					{this.weightMessage()}
					<WeightMeasurementForm animalId={this.state.animal.id} updateWeights={this.addWeightMeasurement} />
				</List.Item>
			)
	}
	
}

export default Animal