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

it('sets active to true by default', () => {
	expect(wrapper.state('family').active).toEqual(true)
})

it('adds one empty animal to the family by default', () => {
	expect(wrapper.state('family').animals.length).toEqual(1)
	expect(wrapper.state('family').animals[0]).toEqual({key: 1})
})

it('includes form fields for an animal', () => {
	const handleAnimalFieldChanged = wrapper.instance().handleAnimalFieldChanged
	const animalFormFields = <AnimalFormFields />

	expect(wrapper.containsAnyMatchingElements([animalFormFields])).toEqual(true)
})

it('adds another set of animal form fields',() => {
	var animalForms = wrapper.find('.animal-form-fields')
	expect(animalForms.length).toEqual(1)

	wrapper.find('.add-animal-button').simulate('click')
	animalForms = wrapper.find('.animal-form-fields')

	expect(animalForms.length).toEqual(2)
})

it('adds an empty animal to the state when another set of form fields are added', () => {
	const startingAnimals = wrapper.state('family').animals
	expect(startingAnimals).toEqual([{key: 1}])
	expect(wrapper.state('animalCount')).toEqual(1)

	wrapper.find('.add-animal-button').simulate('click')

	const updatedAnimals = wrapper.state('family').animals
	expect(updatedAnimals).toEqual([{key: 1}, {key: 2}])
	expect(wrapper.state('animalCount')).toEqual(2)
})

it('sets form values on the state when changed', () => {
	const checkbox = wrapper.find('.active')
	
	wrapper.find('.family-name').simulate('change', {}, {name: 'name', value: 'Bob'})
	checkbox.simulate('change', {}, {name: 'active', checked: true, type: 'checkbox'})

	expect(wrapper.state('family').name).toEqual('Bob')
	expect(wrapper.state('family').active).toEqual(true)

	checkbox.simulate('change', {}, {name: 'active', checked: false, type: 'checkbox'})

	expect(wrapper.state('family').name).toEqual('Bob')
	expect(wrapper.state('family').active).toEqual(false)
})

it('updates the family state with animal info when the handleAnimalFieldChanged function is called', () => {
	wrapper.instance().handleAnimalFieldChanged({key: 1, name: 'Boots'})

	expect(wrapper.state('family').animals).toEqual([{key: 1, name: 'Boots'}])
})

it('can manage state for multiple animals', () => {
	wrapper.instance().handleAnimalFieldChanged({key: 1, name: 'Boots'})
	expect(wrapper.state('family').animals).toEqual([{key: 1, name: 'Boots'}])

	wrapper.find('.add-animal-button').simulate('click')

	wrapper.instance().handleAnimalFieldChanged({key: 2, name: 'Buttons'})
	expect(wrapper.state('family').animals).toEqual([{key: 1, name: 'Boots'}, {key: 2, name: 'Buttons'}])

	wrapper.instance().handleAnimalFieldChanged({key: 1, name: 'Booty', description: "It's a big bum"})
	expect(wrapper.state('family').animals).toEqual([{key: 1, name: 'Booty', description: "It's a big bum"}, {key: 2, name: 'Buttons'}])
})

it('calls handleSubmit with the family data on submit', () => {
	wrapper.find('.family-name').simulate('change', {}, {name: 'name', value: 'Best Family'})
	const checkbox = wrapper.find('.active')
	checkbox.simulate('change', {}, {name: 'active', checked: true, type: 'checkbox'})

	const submitButton = wrapper.find(Button).at(0).dive().find('button[type="submit"]')

	wrapper.find(Form).simulate('submit')

	expect(handleSubmitSpy).toBeCalledWith({name: 'Best Family', active: true, animals: [{key: 1}]})
})