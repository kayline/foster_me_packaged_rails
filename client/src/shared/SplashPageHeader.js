import React, { Component } from 'react';
import logo from '../assets/paw_logo_white.svg';
import { Header, Button } from 'semantic-ui-react'

class SplashPageHeader extends Component {
	render() {
		return (
			<header className="App-header-splash">
	      <img src={logo} className="App-logo-splash" alt="logo" />
	      <Header size="huge" className="App-title">Welcome to FosterMe</Header>
	      <Button><a href="/users/sign_in">Sign In</a></Button>
	      <Button><a href="/users/sign_out">Sign Out</a></Button>
    	</header>
			)
	}
}

export default SplashPageHeader