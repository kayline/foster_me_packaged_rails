import React, { Component } from 'react'
import moment from 'moment'
import momentDurationFormatSetup from "moment-duration-format"
import { List } from 'semantic-ui-react'

class Animal extends Component {
	constructor(props) {
		super(props)
		this.state = {full_image_url: process.env.REACT_APP_BASE_PHOTO_URL + props.animal.profile_photo_path}
	}
	
	displayAge() {
		return this.props.clock.formattedAge(this.props.animal.date_of_birth)
	}

	weightMessage = () => {
		const weightMeasurement = this.mostRecentWeight()
		var message = null

		if(weightMeasurement != undefined) {
			message = `Weight: ${weightMeasurement.weight_in_grams} grams`
		} else {
			message = "No weight recorded"
		}
		return(
				<div className="weight">{message}</div>
		)
	}

	mostRecentWeight = () => {
		return this.props.animal.weight_measurements.sort((a,b) => {
			return moment(a.date) <= moment(b.date)
		})[0]
	}

	render() {
		return (
				<List.Item className="animal-list">
					<List.Content floated="right">
						<img 
							src={this.state.full_image_url}
							floated="right" 
							className="animal-pic" 
							alt={this.props.animal.name} 
						/>
					</List.Content>
					<div className="name">My name is {this.props.animal.name}</div>
					<div>{this.props.animal.description}</div>
					<div>Age: {this.displayAge()}</div>
					<div>Sex: {this.props.animal.sex}</div>
					{this.weightMessage()}
				</List.Item>
			)
	}
	
}

export default Animal