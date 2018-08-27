import React from 'react'
import { mount, shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import NewFosterFamilyForm from '../../../components/foster_families/NewFosterFamilyForm.js'
import { Header, Form, Button } from 'semantic-ui-react'
var handleSubmitSpy

beforeEach(() => {
	handleSubmitSpy = jest.fn()
})

afterEach(() => {
	
})

it('loads the page', () => {
	const wrapper = shallow(<NewFosterFamilyForm handleSubmit={handleSubmitSpy} />)

	const submitButton = <Button type='submit'>Submit</Button>

	expect(wrapper.contains(submitButton)).toEqual(true)
})

it('sets form values on the state when changed', () => {
	const wrapper = shallow(<NewFosterFamilyForm handleSubmit={handleSubmitSpy} />)

	wrapper.find('input.name').simulate('change', { target: {name: 'name', value: 'Bob'}})
	const checkbox = wrapper.find(Form.Field).at(1).dive()
	const checkboxInput = checkbox.find('input')
	checkboxInput.simulate('change', { target: {name: 'active', checked: true, type: 'checkbox'}})

	expect(wrapper.state('family')).toEqual({name: 'Bob', active: true})

	checkboxInput.simulate('change', { target: {name: 'active', checked: false, type: 'checkbox'}})

	expect(wrapper.state('family')).toEqual({name: 'Bob', active: false})
})

it('calls handleSubmit with the family data on submit', () => {
	const wrapper = shallow(<NewFosterFamilyForm handleSubmit={handleSubmitSpy} />)

	wrapper.find('input.name').simulate('change', { target: {name: 'name', value: 'Best Family'}})
	const checkbox = wrapper.find(Form.Field).at(1).dive().find('input')
	checkbox.simulate('change', { target: {name: 'active', checked: true, type: 'checkbox'}})

	const submitButton = wrapper.find(Button).at(0).dive().find('button[type="submit"]')

	wrapper.find(Form).simulate('submit')

	expect(handleSubmitSpy).toBeCalledWith({name: 'Best Family', active: true})
})