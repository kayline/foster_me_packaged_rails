import React, { Component } from 'react';
import SplashPageHeader from '../components/shared/SplashPageHeader.js'
import WelcomeActions from '../components/WelcomeActions.js'

class Welcome extends Component {
	render() {
		return(
			<div className="welcome">
		    <SplashPageHeader/>
		    <p className="App-intro">
		      This app will help you manage your foster animals. Thank you for fostering!
		    </p>
		    <WelcomeActions/>
		    <p className="attribution">animal paw by rupa c from the Noun Project</p>
		  </div>
		)
	}
}

export default Welcome