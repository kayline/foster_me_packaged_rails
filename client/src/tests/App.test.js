import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import { Route } from "react-router-dom"
import App from '../App'
import Welcome from '../pages/Welcome.js'
import Home from '../pages/Home.js'

afterEach(() => {
	fetchMock.restore()
})

it('renders without crashing', () => {
	fetchMock.get('/api/current_user', {status: 200, body: { current_user: {id: 1, email: 'user@test.com'}}})

  shallow(<App />)
})

it('fetches the current user on mount', async () => {
	fetchMock.get('/api/current_user', {status: 200, body: { current_user: {id: 1, email: 'user@test.com'}}})
	
	const wrapper = shallow(<App />)
	
	await wrapper.instance().componentDidMount()
	wrapper.update()

	expect(fetchMock.lastUrl()).toEqual('/api/current_user')
	expect(wrapper.state('current_user')).toEqual({id: 1, email: 'user@test.com'})
})

it('routes all paths to welcome if the current user is not found', async () => {
	fetchMock.get('/api/current_user', {status: 404, body: {errors: ['Current user not found']}})
	
	const welcomeRoute = <Route path="/*" component={Welcome} />
	const wrapper = shallow(<App />)
	
	await wrapper.instance().componentDidMount()
	wrapper.update()

	expect(wrapper.contains(welcomeRoute)).toEqual(true)
})

it('returns the content routes if the current user is found', async () => {
	fetchMock.get('/api/current_user', {status: 200, body: { current_user: {id: 1, email: 'user@test.com'}}})
	
	const familiesListRoute = <Route exact path="/" component={Home} />
	const wrapper = shallow(<App />)
	
	await wrapper.instance().componentDidMount()
	wrapper.update()

	expect(wrapper.contains(familiesListRoute)).toEqual(true)
})