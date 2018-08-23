import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class UserActions extends Component {
	render () {
		return (
			<Button primary className="sign-out"><a href="/users/sign_out">Sign Out</a></Button>
		)
	}
}
export default UserActions