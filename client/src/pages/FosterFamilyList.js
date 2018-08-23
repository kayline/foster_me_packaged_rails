import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react'
import PageHeader from '../shared/PageHeader.js'
import FosterFamilyListItem from '../components/foster_families/FosterFamilyListItem.js';

class FosterFamilyList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeFosterFamilies: [],
			completedFosterFamilies: []
		}
	}

	componentDidMount() {
		fetch('/api/foster_families')
			.then(response => response.json())
			.then(result => {
				this.setState({
					activeFosterFamilies: result.filter(family => family.active),
					completedFosterFamilies: result.filter(family => !family.active)
				})
			})
	}

	render() {
		return (
			<div>
				<PageHeader/>
				<div className="families-container">
					<Header size="large">Your Active Foster Families</Header>
					<List divided verticalAlign='middle' className="list-families-active">
		        {this.state.activeFosterFamilies.map(family => (
		      		<FosterFamilyListItem
		      			key={family.id}
		      			family={family}
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
			</div>
		)
	}
}

export default FosterFamilyList;
