import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Welcome extends Component {
	render() {
		return (
			<div className="welcome">
				<Button><a href="/users/sign_in">Sign In</a></Button>
			</div>
		)
	}
}

export default Welcome