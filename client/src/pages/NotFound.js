import React, { Component } from 'react'
import { Header, Button, Container } from 'semantic-ui-react'

class NotFound extends Component {
	render() {
		return (
			<Container text textAlign="center" className="not-found">
				<Header size="large">404: Not Found</Header>
				<img src="/images/what-cat.jpg" alt="confused"/>
				<p>Whoops, we lost you</p>
				<Button>
					<a href="/">Back to Home</a>
				</Button>
			</Container>
		)
	}
}

export default NotFound