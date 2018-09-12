import React, { Component } from 'react';
import LinkButton from '../shared/LinkButton.js'

class FosterFamilyActionBar extends Component {
	render() {
		return(
			<div className="family-actions">
				<LinkButton className="new-family-button" href="/foster-families/new" content="Add A Foster Family" />
			</div>
		)
	}
}

export default FosterFamilyActionBar