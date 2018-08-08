import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react'

class FosterFamilyListItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			id: props.id,
			name: props.name
		}
	}

	render() {
		return (
			<List.Item className="list-item-family">
				<List.Content>
				<Header size="medium">
					<a href={'/foster-families/' + this.props.id}>
			        <div key={this.props.id}>
			          {this.props.name}
			        </div>
	        </a>
        </Header>
        </List.Content>
			</List.Item>
		)
	}
}

export default FosterFamilyListItem;
