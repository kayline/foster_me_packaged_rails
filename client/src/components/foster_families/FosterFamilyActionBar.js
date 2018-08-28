import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class FosterFamilyActionBar extends Component {
	render() {
		return(
			<div className="family-actions">
				<Button primary className="new-family-button"><a href="/foster-families/new">Add A Foster Family</a></Button>
			</div>
		)
	}
}

export default FosterFamilyActionBar