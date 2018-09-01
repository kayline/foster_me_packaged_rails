import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import moment from 'moment'
import { Header, Form, Button } from 'semantic-ui-react'
import NewFosterFamilyForm from '../../../components/foster_families/NewFosterFamilyForm.js'
import AnimalFormFields from '../../../components/animals/AnimalFormFields.js'
var handleSubmitSpy, wrapper, defaultDOB

beforeEach(() => {
	const emptyErrors = {
		animals: [],
		family: []
	}
	defaultDOB = moment().startOf('year')
	handleSubmitSpy = jest.fn()
	wrapper = shallow(<NewFosterFamilyForm handleSubmit={handleSubmitSpy} errors={emptyErrors}/>)
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
	expect(wrapper.state('family').animals[0]).toEqual({key: 1, date_of_birth: defaultDOB})
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
	expect(startingAnimals).toEqual([{key: 1, date_of_birth: defaultDOB}])
	expect(wrapper.state('animalCount')).toEqual(1)

	wrapper.find('.add-animal-button').simulate('click')

	const updatedAnimals = wrapper.state('family').animals
	expect(updatedAnimals).toEqual([{key: 1, date_of_birth: defaultDOB}, {key: 2, date_of_birth: defaultDOB}])
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

	expect(wrapper.state('family').animals.length).toEqual(1)
	expect(wrapper.state('family').animals[0].name).toEqual('Boots')
})

it('can manage state for multiple animals', () => {
	wrapper.instance().handleAnimalFieldChanged({key: 1, name: 'Boots'})

	expect(wrapper.state('family').animals.length).toEqual(1)
	expect(wrapper.state('family').animals[0].name).toEqual('Boots')

	wrapper.find('.add-animal-button').simulate('click')

	wrapper.instance().handleAnimalFieldChanged({key: 2, name: 'Buttons'})

	expect(wrapper.state('family').animals.length).toEqual(2)
	expect(wrapper.state('family').animals[0].name).toEqual('Boots')
	expect(wrapper.state('family').animals[1].name).toEqual('Buttons')

	wrapper.instance().handleAnimalFieldChanged({key: 1, name: 'Booty', description: "It's a big bum"})

	expect(wrapper.state('family').animals.length).toEqual(2)
	expect(wrapper.state('family').animals[0].name).toEqual('Booty')
	expect(wrapper.state('family').animals[0].description).toEqual("It's a big bum")
	expect(wrapper.state('family').animals[1].name).toEqual('Buttons')
})

it('calls handleSubmit with the family data on submit', () => {
	wrapper.find('.family-name').simulate('change', {}, {name: 'name', value: 'Best Family'})
	const checkbox = wrapper.find('.active')
	checkbox.simulate('change', {}, {name: 'active', checked: true, type: 'checkbox'})

	const submitButton = wrapper.find(Button).at(0).dive().find('button[type="submit"]')

	wrapper.find(Form).simulate('submit')

	expect(handleSubmitSpy).toBeCalledWith({name: 'Best Family', active: true, animals: [{key: 1, date_of_birth: moment().startOf('year')}]})
})

it('displays error messages if present', () => {
	const errors = {
		family: ['Active field cannot be blank', 'Some other problem'],
		animals: ['Description is required', 'Animals this cute are not permitted']
	}
	const familyErrorMessage = <div className="error create-family-error">Family: Active field cannot be blank, Some other problem</div>
	const animalsErrorMessage = <div className="error create-animals-error">Animals: Description is required, Animals this cute are not permitted</div>
	
	wrapper = shallow(<NewFosterFamilyForm handleSubmit={handleSubmitSpy} errors={errors}/>)

	expect(wrapper.contains(familyErrorMessage)).toEqual(true)
	expect(wrapper.contains(animalsErrorMessage)).toEqual(true)
})