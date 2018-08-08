import React, { Component } from 'react';
import { List } from 'semantic-ui-react'

class Animal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			animal: props.animal
		}
	}

	render() {
		return (
				<List.Item>
					<List.Content>
						<List.Header>My name is {this.state.animal.name}</List.Header>
						<div>{this.state.animal.description}</div>
						<div>Age: {this.state.animal.age} weeks</div>
						<div>Sex: {this.state.animal.sex}</div>
					</List.Content>
				</List.Item>
			)
	}
	
}

export default Animal