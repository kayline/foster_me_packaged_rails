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
		var now = moment()
		var ageInWeeks = now.diff(this.props.animal.date_of_birth, 'weeks')
		if(ageInWeeks < 12) {
			return moment.duration(ageInWeeks, 'weeks').format("W [weeks]")
		} else {
			return moment.duration(ageInWeeks, 'weeks').format("Y [years] M [months]")
		}
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
					
				</List.Item>
			)
	}
	
}

export default Animal