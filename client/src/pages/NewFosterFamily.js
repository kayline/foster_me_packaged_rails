import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import PageHeader from '../shared/PageHeader.js'
import NewFosterFamilyForm from '../components/foster_families/NewFosterFamilyForm.js'

class NewFosterFamily extends Component {
	constructor(props) {
		super(props)
		this.state = {
			family: {
			},
			errors: {
				family: [],
				animals: []
			}
		}
	}

	onFormChange = (event) => {
		const family = this.state.family
		var newValues = {}

		if(event.target.type === "checkbox") {
			newValues[event.target.name] = event.target.checked
		} else {
			newValues[event.target.name] = event.target.value
		}

		const updatedFamily = {...family, ...newValues}
		this.setState({family: updatedFamily})
	}

	onFormSubmit = (familyData) => {
		const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
		return fetch('/api/foster_families', {method: 'post', headers: headers, body: JSON.stringify(familyData)})
					 .then(response => this.handleErrors(response))
					 .then(response => this.props.history.push('/'))
					 .catch(error => null)
	}

	handleErrors(response) {
    if (!response.ok) {
    	response.json()
    	.then(result => this.setState({errors: result.errors}))
    	throw Error('Error while creating family')
    }
    return response
	}

	renderFamilyErrors() {
		if(this.state.errors.family.length > 0) {
			return (
				<div className="error create-family-error">{"Family: " + this.state.errors.family.join(', ')}</div>
			)
		}
	}

	renderAnimalsErrors() {
		if(this.state.errors.animals.length > 0) {
			return (
				<div className="error create-animals-error">{"Animals: " + this.state.errors.animals.join(', ')}</div>
			)
		}
	}

	render() {
		return (
			<div className="new-foster-family">
				<PageHeader />
				<div className="container new-foster-family-container">
					{this.renderFamilyErrors()}
					{this.renderAnimalsErrors()}
					<Header size="large">Add Your Foster Family</Header>
					<img src="/images/upside-down-cat.jpg" alt="excited-cat"/>
					<NewFosterFamilyForm handleSubmit={this.onFormSubmit} />
				</div>
			</div>
		)
	}
}

export default withRouter(NewFosterFamily)