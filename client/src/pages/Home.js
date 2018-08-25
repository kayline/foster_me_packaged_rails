import React, { Component } from 'react';
import FosterFamilyList from '../components/foster_families/FosterFamilyList.js'
import Welcome from '../components/Welcome.js'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current_user: null,
			fetchComplete: false
		}
	}

	componentDidMount() {
		fetch('/api/current_user')
		.then(response => response.json())
		.then(result => this.setState({current_user: result.current_user, fetchComplete: true}))
	}

	getHomeContent() {
		if(this.state.fetchComplete && this.state.current_user === undefined) {
			return <Welcome/>
    } else if(this.state.fetchComplete) {
    	return <FosterFamilyList/>
    }
	}

	render() {
		return(
			<div className="App">
		    {this.getHomeContent()}
		    <p className="attribution">animal paw by rupa c from the Noun Project</p>
		  </div>
		)
	}
}

export default Home