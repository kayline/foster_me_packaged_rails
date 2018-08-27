import React from 'react'
import { mount, shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import NewFosterFamily from '../../pages/NewFosterFamily.js'
import { Header, Form, Button } from 'semantic-ui-react'

afterEach(() => {
	fetchMock.restore()
})

it('loads the page', () => {
	const wrapper = shallow(<NewFosterFamily />)

	const header = <Header size="large">Add Your Foster Family</Header>

	expect(wrapper.contains(header)).toEqual(true)
})

it('sends the family data to the api on submit', () => {
	fetchMock.post('/api/foster_families', 201)
	const wrapper = shallow(<NewFosterFamily />)

	wrapper.instance().onFormSubmit({name: 'Bob', active: true})

	expect(fetchMock.lastCall()[0]).toEqual('/api/foster_families')
	expect(fetchMock.lastCall()[1].body).toEqual(JSON.stringify({name: 'Bob', active: true}))
	expect(fetchMock.lastCall()[1].method).toEqual('post')
})