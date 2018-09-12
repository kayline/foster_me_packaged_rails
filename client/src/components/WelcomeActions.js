import React, { Component } from 'react'
import LinkButton from '../shared/LinkButton.js'

class WelcomeActions extends Component {
	render() {
		return (
			<div className="welcome">
				<LinkButton href="/users/sign_in" content="Sign In" />
			</div>
		)
	}
}

export default WelcomeActions