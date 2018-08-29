import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import { Header, Form, Button } from 'semantic-ui-react'
import NewFosterFamilyForm from '../../../components/foster_families/NewFosterFamilyForm.js'
import AnimalFormFields from '../../../components/animals/AnimalFormFields.js'
var handleSubmitSpy, wrapper

beforeEach(() => {
	handleSubmitSpy = jest.fn()
	wrapper = shallow(<NewFosterFamilyForm handleSubmit={handleSubmitSpy} />)
})

it('loads the form', () => {
	const submitButton = <Button className="new-family-submit" primary type='submit'>Submit</Button>

	expect(wrapper.contains(submitButton)).toEqual(true)
})

it('includes form fields for an animal', () => {
	const handleAnimalFieldChanged = wrapper.instance().handleAnimalFieldChanged
	const animalFormFields = <AnimalFormFields />

	expect(wrapper.containsAnyMatchingElements([animalFormFields])).toEqual(true)
})

// it('adds another set of animal form fields',() => {
// 	const animalNameInput = <Form.Input name="name" className="animal-name" label="Animal Name" placeholder='Animal Name' />

// 	wrapper.find('add-animal-button').simulate('click')

// 	expect(wrapper.find(animalNameInput).length).toEqual(2)
// })

it('sets active to true by default', () => {
	expect(wrapper.state('family')).toEqual({ active: true })
})

it('sets form values on the state when changed', () => {
	wrapper.find('input.family-name').simulate('change', { target: {name: 'name', value: 'Bob'}})
	const checkbox = wrapper.find(Form.Field).at(1).dive()
	const checkboxInput = checkbox.find('input')
	checkboxInput.simulate('change', { target: {name: 'active', checked: true, type: 'checkbox'}})

	expect(wrapper.state('family')).toEqual({name: 'Bob', active: true})

	checkboxInput.simulate('change', { target: {name: 'active', checked: false, type: 'checkbox'}})

	expect(wrapper.state('family')).toEqual({name: 'Bob', active: false})
})

it('updates the family state with animal info when the handleAnimalFieldChanged function is called', () => {
	wrapper.instance().handleAnimalFieldChanged({key: 1, name: 'Boots'})

	expect(wrapper.state('family').animals).toEqual([{key: 1, name: 'Boots'}])
})

it('calls handleSubmit with the family data on submit', () => {
	wrapper.find('input.family-name').simulate('change', { target: {name: 'name', value: 'Best Family'}})
	const checkbox = wrapper.find(Form.Field).at(1).dive().find('input')
	checkbox.simulate('change', { target: {name: 'active', checked: true, type: 'checkbox'}})

	const submitButton = wrapper.find(Button).at(0).dive().find('button[type="submit"]')

	wrapper.find(Form).simulate('submit')

	expect(handleSubmitSpy).toBeCalledWith({name: 'Best Family', active: true})
})