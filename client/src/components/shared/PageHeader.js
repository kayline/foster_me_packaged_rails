import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/paw_logo_white.svg';
import UserActions from './UserActions.js'

class PageHeader extends Component {
	render() {
		return (
			<div className="page-header">
				<Link className="home-link" to="/">
					<img src={logo} className="app-logo-header" alt="logo" />
				</Link>
				<UserActions/>
			</div>
		)
	}
}

export default PageHeader