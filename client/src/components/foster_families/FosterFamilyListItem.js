import React, { Component } from 'react';
import { List, Icon, Header } from 'semantic-ui-react'

class FosterFamilyListItem extends Component {
	renderCompletionBadge() {
		if(!this.props.family.active) { return <Icon className="icon-completion" name='check'/>}
	}

	render() {
		var listClasses = this.props.family.active ? "list-item-family" : "list-item-family complete"
		return (
			<List.Item className={listClasses}>
				{this.renderCompletionBadge()}
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
