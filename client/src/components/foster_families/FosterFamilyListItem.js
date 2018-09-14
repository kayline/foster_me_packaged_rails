import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react'
import moment from 'moment'

class FosterFamilyListItem extends Component {

	completionDateMessage() {
		const date = moment(this.props.family.completion_date).format('LL')
		return 'Completed ' + date
	}

	renderCompletionContent() {
		if (!this.props.family.active && this.props.family.completion_date != null) {
			return (
				<span className="completion-date">{this.completionDateMessage()}</span>
			)
		} else if (this.props.family.active) {
			return ( <Button primary floated="right" size="mini" className="complete-family" onClick={this.onFamilyCompleted} content="Completed" /> )
		}
	}

	onFamilyCompleted = () => {
		const path = `/api/foster_families/${this.props.family.id}`
		const today = moment().format('YYYY-M-D')
		const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
		return fetch(
			path, 
			{
				method: 'post', 
				headers: headers, 
				body: JSON.stringify({family: {active: false, completion_date: today}})
			}
		)
	}

	render() {
		return (
			<List.Item className="list-item-family">
				<List.Content>
					<List.Header>
						<a className="family-link" href={'/foster-families/' + this.props.family.id}>
				        <div key={this.props.family.id}>
				          {this.props.family.name}
				        </div>
		        </a>
		        {this.renderCompletionContent()}
	        </List.Header>
        </List.Content>
			</List.Item>
		)
	}
}

export default FosterFamilyListItem;
