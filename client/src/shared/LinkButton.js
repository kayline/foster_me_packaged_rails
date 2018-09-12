import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class LinkButton extends Component {
	render () {
		return (
			<a href={this.props.href}>
				<Button primary className={this.props.className} content={this.props.content} />
			</a>
		)
	}
}
export default LinkButton