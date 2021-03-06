import React, { Component } from 'react'
import { List, Header } from 'semantic-ui-react'
import PageHeader from '../shared/PageHeader.js'
import FosterFamilyListItem from './FosterFamilyListItem.js'
import FosterFamilyActionBar from './FosterFamilyActionBar.js'

class FosterFamilyList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeFosterFamilies: [],
			completedFosterFamilies: [],
			fetchComplete: false
		}
	}

	componentDidMount() {
		return this.fetchFamilies()
	}

	fetchFamilies = () => {
		return fetch('/api/foster_families')
		.then(response => this.handleErrors(response))
		.then(response => response.json())
		.then(result => {
			this.setState({
				activeFosterFamilies: result.filter(family => family.active),
				completedFosterFamilies: result.filter(family => !family.active),
				fetchComplete: true
			})
		})
		.catch(error => console.error(error))
	}

	handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
	}

	getLists() {
		if(this.state.fetchComplete && this.noFostersFound()) {
			return (
				<div className="no-families-message">
					<Header size="medium">Looks like you don't have any foster families in our system. Add a family now to get started!</Header>
				</div>
			)
		} else if(this.state.fetchComplete) {
			return (
				<div className="lists-families">
					<Header size="large">Your Active Foster Families</Header>
					<List divided verticalAlign='middle' className="list-families-active">
		        {this.state.activeFosterFamilies.map(family => (
		      		<FosterFamilyListItem
		      			key={family.id}
		      			family={family}
		      			onUpdateSuccess={this.fetchFamilies}
		      		/>
		        ))}
	        </List>
	        <Header size="large" className="families-header-completed">Your Completed Foster Families</Header>
	        <List divided verticalAlign='middle' className="list-families-completed">
		        {this.state.completedFosterFamilies.map(family => (
		      		<FosterFamilyListItem
		      			key={family.id}
		      			family={family}
		      		/>
	        	))}
	      	</List>
				</div>
			)
		}
	}

	noFostersFound() {
		return this.state.activeFosterFamilies.length === 0 
			&& this.state.completedFosterFamilies.length === 0
	}

	render() {
		return (
			<div>
				<PageHeader/>
				<FosterFamilyActionBar />
				<div className="families-container">
					{this.getLists()}
				</div>
			</div>
		)
	}
}

export default FosterFamilyList;
