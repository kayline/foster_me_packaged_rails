import React, { Component } from 'react';
import FosterFamilyList from '../components/foster_families/FosterFamilyList.js'

class Home extends Component {
	render() {
		return(
			<div className="App">
		    <FosterFamilyList/>
		    <p className="attribution">animal paw by rupa c from the Noun Project</p>
		  </div>
		)
	}
}

export default Home