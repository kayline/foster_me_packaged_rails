import React, { Component } from 'react';
import { List } from 'semantic-ui-react'
import moment from 'moment'

class FosterFamilyListItem extends Component {

	completionDateMessage() {
		const date = moment(this.props.family.completion_date).format('LL')
		return 'Completed ' + date
	}

	renderCompletionDate() {
		if(!this.props.family.active && this.props.family.completion_date != null) {
			return (
				<span className="completion-date">{this.completionDateMessage()}</span>
			)
		}
	}

	render() {
		return (
			<List.Item className="list-item-family">
				<List.Content>
					<List.Header>
						<a className="family-link" href={'/foster-families/' + this.props.family.id}>
				        <div key={this.props.family.id}>
				          {this.props.family.name}
				          {this.renderCompletionDate()}
				        </div>
		        </a>
	        </List.Header>
        </List.Content>
			</List.Item>
		)
	}
}

export default FosterFamilyListItem;
