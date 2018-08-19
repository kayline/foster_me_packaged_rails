import React, { Component } from 'react';
import { List } from 'semantic-ui-react'

class FosterFamilyListItem extends Component {
	render() {
		return (
			<List.Item className="list-item-family">
				<List.Content>
					<List.Header>
						<a href={'/foster-families/' + this.props.family.id}>
				        <div key={this.props.family.id}>
				          {this.props.family.name}
				        </div>
		        </a>
	        </List.Header>
        </List.Content>
			</List.Item>
		)
	}
}

export default FosterFamilyListItem;
