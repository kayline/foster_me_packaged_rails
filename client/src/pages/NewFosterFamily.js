import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import PageHeader from '../shared/PageHeader.js'
import NewFosterFamilyForm from '../components/foster_families/NewFosterFamilyForm.js'

class NewFosterFamily extends Component {
	constructor(props) {
		super(props)
		this.state = {
			family: {
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
	}

	render() {
		return (
			<div className="new-foster-family">
				<PageHeader />
				<div className="container new-foster-family-container">
					<Header size="large">Add Your Foster Family</Header>
					<img src="/images/upside-down-cat.jpg" alt="excited-cat"/>
					<NewFosterFamilyForm handleSubmit={this.onFormSubmit} />
				</div>
			</div>
		)
	}
}

export default NewFosterFamily