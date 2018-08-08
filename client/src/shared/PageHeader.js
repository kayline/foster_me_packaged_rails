import React, { Component } from 'react';
import logo from '../assets/paw_logo_white.svg';
import { Link } from "react-router-dom";

class PageHeader extends Component {
	render() {
		return(
			<div className="page-header">
				<Link to="/">
					<img src={logo} className="app-logo-header" alt="logo" />
				</Link>
			</div>
			)
	}
}

export default PageHeader