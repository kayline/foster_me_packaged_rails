import React, { Component } from 'react';
import SplashPageHeader from './shared/SplashPageHeader.js'
import FosterFamilyList from './pages/FosterFamilyList.js'

class Home extends Component {
	render() {
		return(
			<div className="App">
		    <SplashPageHeader/>
		    <p className="App-intro">
		      This app will help you manage your foster animals. Thank you for fostering!
		    </p>
		    <FosterFamilyList/>
		    <p className="attribution">animal paw by rupa c from the Noun Project</p>
		  </div>
		)
	}
}

export default Home