import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react'
import FosterFamilyListItem from '../components/foster_families/FosterFamilyListItem.js';

class FosterFamilyList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fosterFamilies: []
		}
	}

	componentDidMount() {
		fetch('/api/foster_families')
			.then(response => response.json())
			.then(result => {
				this.setState({fosterFamilies: result})
			})
	}

	render() {
		return (
			<div className="splash-page-families">
				<Header size="large">Your Foster Families</Header>
					<List divided verticalAlign='middle' className="list-families">
	        {this.state.fosterFamilies.map(family => (
	      		<FosterFamilyListItem
	      			key={family.id}
	      			id={family.id}
	      			name={family.name}/>
	        ))}
        </List>
			</div>
		)
	}
}

export default FosterFamilyList;
