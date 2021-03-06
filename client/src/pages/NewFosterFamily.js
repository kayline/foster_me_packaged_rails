import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"
import PageHeader from '../components/shared/PageHeader.js'
import NewFosterFamilyForm from '../components/foster_families/NewFosterFamilyForm.js'

class NewFosterFamily extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errors: {
				family: [],
				animals: []
			}
		}
	}

	onFormSubmit = (familyData) => {
		const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
		return fetch('/api/foster_families', {method: 'post', headers: headers, body: JSON.stringify({family: familyData})})
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

	

	render() {
		return (
			<div className="new-foster-family">
				<PageHeader />
				<div className="container new-foster-family-container">
					<Header size="large">Add Your Foster Family</Header>
					<img className="new-family-image" src="/images/upside-down-cat.jpg" alt="excited-cat"/>
					<NewFosterFamilyForm handleSubmit={this.onFormSubmit} errors={this.state.errors}/>
				</div>
			</div>
		)
	}
}

export default withRouter(NewFosterFamily)