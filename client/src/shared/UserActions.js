import React, { Component } from 'react';
import LinkButton from './LinkButton.js'

class UserActions extends Component {
	render () {
		return (
			<LinkButton href="/users/sign_out" className="sign-out" content="Sign Out" />
		)
	}
}
export default UserActions