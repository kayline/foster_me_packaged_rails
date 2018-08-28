import React from 'react'
import { mount, shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import NewFosterFamily from '../../pages/NewFosterFamily.js'
import { Header, Form, Button } from 'semantic-ui-react'

afterEach(() => {
	fetchMock.restore()
})

it('loads the page', () => {
	const wrapper = shallow(<NewFosterFamily.WrappedComponent />)

	const header = <Header size="large">Add Your Foster Family</Header>

	expect(wrapper.contains(header)).toEqual(true)
})

it('sends the family data to the api on submit', () => {
	fetchMock.post('/api/foster_families', 201)
	const wrapper = shallow(<NewFosterFamily.WrappedComponent />)

	wrapper.instance().onFormSubmit({name: 'Bob', active: true})

	expect(fetchMock.lastCall()[0]).toEqual('/api/foster_families')
	expect(fetchMock.lastCall()[1].body).toEqual(JSON.stringify({name: 'Bob', active: true}))
	expect(fetchMock.lastCall()[1].method).toEqual('post')
})

it('displays an error message if the create did not succeed', async () => {
	fetchMock.post('/api/foster_families', {status: 500, body: {errors: ['Active field cannot be blank', 'Some other problem']}})
	// const fakePush = jest.fn()
	// const fakeHistory = {push: fakePush}
	const errorMessage = <div className="error create-family-error">Active field cannot be blank, Some other problem</div>
	
	const wrapper = shallow(<NewFosterFamily.WrappedComponent />)

	await wrapper.instance().onFormSubmit({name: 'Bob', active: true})
	wrapper.update()

	expect(wrapper.contains(errorMessage)).toEqual(true)
})

it('redirects to Home if the create succeeds', async () => {
	fetchMock.post('/api/foster_families', 201)
	const fakePush = jest.fn()
	const fakeHistory = {push: fakePush}
	
	const wrapper = shallow(<NewFosterFamily.WrappedComponent history={fakeHistory} />)

	await wrapper.instance().onFormSubmit({name: 'Bob', active: true})
	wrapper.update()

	expect(fakePush).toBeCalledWith('/')
})