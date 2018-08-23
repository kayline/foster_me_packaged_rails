import React, { Component } from 'react';
import SplashPageHeader from './shared/SplashPageHeader.js'
import FosterFamilyList from './pages/FosterFamilyList.js'
import Welcome from './components/Welcome.js'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current_user: null
		}
	}

	componentWillMount() {
		fetch('/api/current_user')
		.then(response => response.json())
		.then(current_user => this.setState({current_user: current_user}))
	}

	getHomeContent() {
		if(this.state.current_user != null) {
    	return <FosterFamilyList/>
    } else {
    	return <Welcome/>
    }
	}

	render() {
		return(
			<div className="App">
		    <SplashPageHeader/>
		    <p className="App-intro">
		      This app will help you manage your foster animals. Thank you for fostering!
		    </p>
		    {this.getHomeContent()}
		    <p className="attribution">animal paw by rupa c from the Noun Project</p>
		  </div>
		)
	}
}

export default Home