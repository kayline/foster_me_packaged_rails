import React from 'react'
import { mount, shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import { Header, Form, Button } from 'semantic-ui-react'
import NewFosterFamily from '../../pages/NewFosterFamily.js'
import NewFosterFamilyForm from '../../components/foster_families/NewFosterFamilyForm.js'

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

it('passes the errors to the form if create did not succeed', async () => {
	const errors = {
		family: ['Active field cannot be blank', 'Some other problem'],
		animals: ['Description is required', 'Animals this cute are not permitted']
	}
	const formWithErrors = <NewFosterFamilyForm errors={errors} />
	fetchMock.post('/api/foster_families', {status: 500, body: {errors: errors}})
	
	const wrapper = shallow(<NewFosterFamily.WrappedComponent />)

	await wrapper.instance().onFormSubmit({name: 'Bob'})
	wrapper.update()

	expect(wrapper.containsAnyMatchingElements([formWithErrors])).toEqual(true)
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