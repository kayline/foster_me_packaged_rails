import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class WelcomeActions extends Component {
	render() {
		return (
			<div className="welcome">
				<Button primary><a href="/users/sign_in">Sign In</a></Button>
			</div>
		)
	}
}

export default WelcomeActions