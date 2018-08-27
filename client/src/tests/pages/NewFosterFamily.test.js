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

it('sets form values on the state when changed', () => {
	
	const wrapper = shallow(<NewFosterFamily />)

	wrapper.find('input.name').simulate('change', { target: {name: 'name', value: 'Bob'}})
	const checkbox = wrapper.find(Form.Field).at(1).dive()
	const checkboxInput = checkbox.find('input')
	checkboxInput.simulate('change', { target: {name: 'active', checked: true, type: 'checkbox'}})

	expect(wrapper.state('family')).toEqual({name: 'Bob', active: true})

	checkboxInput.simulate('change', { target: {name: 'active', checked: false, type: 'checkbox'}})

	expect(wrapper.state('family')).toEqual({name: 'Bob', active: false})
})

it('sends the family params to the api on submit', () => {
	fetchMock.post('/api/foster-families/create', 201)
	const wrapper = shallow(<NewFosterFamily />)

	wrapper.find('input.name').simulate('change', { target: {name: 'name', value: 'Bob'}})
	const checkbox = wrapper.find(Form.Field).at(1).dive().find('input')
	checkbox.simulate('change', { target: {name: 'active', checked: true, type: 'checkbox'}})

	const submitButton = wrapper.find(Button).at(0).dive().find('button[type="submit"]')

	wrapper.find(Form).simulate('submit')

	expect(fetchMock.lastCall()[0]).toEqual('/api/foster-families/create')
	expect(fetchMock.lastCall()[1].body).toEqual({name: 'Bob', active: true})
	expect(fetchMock.lastCall()[1].method).toEqual('post')
})