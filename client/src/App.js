import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Welcome from './pages/Welcome.js'
import Home from './pages/Home.js'
import NotFound from './pages/NotFound.js'
import FosterFamilyDetail from './pages/FosterFamilyDetail.js'
import NewFosterFamily from './pages/NewFosterFamily.js'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current_user: null,
			fetchComplete: false
		}
	}

	componentDidMount() {
		return fetch('/api/current_user')
		.then(response => response.json())
		.then(result => this.setState({current_user: result.current_user, fetchComplete: true}))
	}

	loggedIn = () => {
		return this.state.current_user !== undefined
	}

	render() {
		if(this.state.fetchComplete && !this.loggedIn()) {
			return (
				<Router> 
					<Route path="/*" component={Welcome} />
				</Router>
			)
		} else {
			return(
				<Router>
			    <Switch>
			      <Route exact path="/" component={Home} />
			      <Route exact path="/foster-families/new" component={NewFosterFamily} />
			      <Route exact path="/foster-families/:id" component={FosterFamilyDetail} />
			      <Route component={NotFound} />
			    </Switch>
			  </Router>
			)
		}
	}
}
  
export default App