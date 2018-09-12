import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import logo from '../../assets/paw_logo_white.svg';

class SplashPageHeader extends Component {
	render() {
		return (
			<header className="App-header-splash">
	      <img src={logo} className="App-logo-splash" alt="logo" />
	      <Header size="huge" className="App-title">Welcome to FosterMe</Header>
    	</header>
		)
	}
}

export default SplashPageHeader