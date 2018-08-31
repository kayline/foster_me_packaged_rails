import React from 'react'
import { mount, shallow } from 'enzyme'
import AnimalFormFields from '../../../components/animals/AnimalFormFields.js'
import { Form } from 'semantic-ui-react'
var fakeOnChange, wrapper

beforeEach(() => {
	fakeOnChange = jest.fn()
	wrapper = shallow(<AnimalFormFields onChange={fakeOnChange} animalKey={1}/>)
})

it('renders all the fields for an animal', () => {
	const sexOptions = [
			{key: "f", text: "Female", value: "Female"}, 
			{key: "m", text: "Male", value: "Male"}
		]

	const animalNameInput = <Form.Input 
														name="name" 
														className="animal-name" 
													/>
	const animalDescriptionInput = 	<Form.TextArea 
																		name="description" 
																		className="animal-description"
																	/>
	const animalSexInput = 	<Form.Select 
														name="sex" 
														className="animal-sex"
														options={sexOptions} 
													/>

	expect(wrapper.containsAnyMatchingElements([animalNameInput])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([animalDescriptionInput])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([animalSexInput])).toEqual(true)
})

it('sets the animalKey prop on the animal state', () => {
	expect(wrapper.state('animal').key).toEqual(1)
})

it('updates the state when a field is changed', () => {
	wrapper.find('.animal-name').simulate('change', {}, {name: 'name', value: 'Bob'})
	expect(wrapper.state('animal')).toEqual({key: 1, name: 'Bob'})

	wrapper.find('.animal-description').simulate('change', {}, {name: 'description', value: 'Adorkable'})
	expect(wrapper.state('animal')).toEqual({key: 1, name: 'Bob', description: 'Adorkable'})

	wrapper.find('.animal-sex').simulate('change', {}, {name: 'sex', value: 'Male'})
	expect(wrapper.state('animal')).toEqual({key: 1, name: 'Bob', description: 'Adorkable', sex: 'Male'})
})

it('calls the parent onChange function with new state and key prop when a field is changed', () => {
	wrapper.find('.animal-name').simulate('change', {}, {name: 'name', value: 'Bob'})

	expect(fakeOnChange).toHaveBeenCalledWith({key: 1, name: 'Bob'})
})