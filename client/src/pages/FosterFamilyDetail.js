import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react'
import PageHeader from '../shared/PageHeader.js'
import Animal from '../components/animals/Animal.js'

class FosterFamilyDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: props.match.params.id,
			family:{
				animals: []
			},
			error: null,
			fetchComplete: false
		}
	}

	componentDidMount() {
		return fetch('/api/foster_families/' + this.state.id)
		.then(response => this.handleErrors(response))
		.then(response => response.json())
		.then(result => this.setState({family: result, fetchComplete: true}))
		.catch(error => {
			this.setState({error: error})
			console.log(error)
		})
	}

	handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
	}

	getContent() {
		if(this.state.fetchComplete && this.state.error === null) {
			return (
				<div>
					<Header size="large">{this.state.family.name}</Header>
					<List celled>
						{this.state.family.animals.map(animal => (
		      		<Animal
		      			key={animal.id}
		      			animal={animal}/>
		        ))}
	        </List>
        </div>
			)
		} 
	}

	render() {
		return (
			<div>
				<PageHeader/>
				<div className="family-container">
					{this.getContent()}
        </div>
			</div>
		)
	}
}

export default FosterFamilyDetail;
