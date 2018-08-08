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
			}
		}
	}

	componentDidMount() {
		fetch('/api/foster_families/' + this.state.id)
		.then(response => response.json())
		.then(family => this.setState({family: family}))
	}

	render() {
		return (
			<div>
				<PageHeader/>
				<div className="container">
					<Header size="large">{this.state.family.name}</Header>
						<List celled>
						{this.state.family.animals.map(animal => (
		      		<Animal
		      			key={animal.id}
		      			animal={animal}/>
		        ))}
	        </List>
        </div>
			</div>
		)
	}
}

export default FosterFamilyDetail;
