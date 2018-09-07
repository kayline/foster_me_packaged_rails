import React from 'react'
import { mount, shallow } from 'enzyme'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import AnimalFormFields from '../../../components/animals/AnimalFormFields.js'
import FileUploadFormField from '../../../shared/FileUploadFormField.js'
import { Form } from 'semantic-ui-react'
var fakeOnChange, wrapper, defaultDOB, emptyAnimal

beforeEach(() => {
	defaultDOB = moment().startOf('year')
	fakeOnChange = jest.fn()
	emptyAnimal = {key: 1, date_of_birth: defaultDOB}
	wrapper = shallow(<AnimalFormFields onChange={fakeOnChange} animal={emptyAnimal}/>)
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
	const animalDOBInput =	<Form.Field 
														name="date_of_birth" 
														className="animal-date-of-birth"
													/>
	const photoUpload = <FileUploadFormField label="Profile Photo" placeholder="Upload a Photo"/>

	expect(wrapper.containsAnyMatchingElements([animalNameInput])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([animalDescriptionInput])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([animalSexInput])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([animalDOBInput])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([photoUpload])).toEqual(true)
})

it('sets the animalKey prop on the animal state', () => {
	expect(wrapper.state('animal').key).toEqual(1)
})

it('sets the date of birth to the defualt date on load', () => {
	expect(wrapper.state('animal').date_of_birth).toEqual(defaultDOB)
})

it('updates the state when a field is changed', () => {
	expect(wrapper.state('animal')).toEqual({key: 1, date_of_birth: defaultDOB})

	wrapper.find('.animal-name').simulate('change', {}, {name: 'name', value: 'Bob'})
	expect(wrapper.state('animal').name).toEqual('Bob')

	wrapper.find('.animal-description').simulate('change', {}, {name: 'description', value: 'Adorkable'})
	expect(wrapper.state('animal').description).toEqual('Adorkable')
	expect(wrapper.state('animal').name).toEqual('Bob')

	wrapper.find('.animal-sex').simulate('change', {}, {name: 'sex', value: 'Male'})
	expect(wrapper.state('animal').sex).toEqual('Male')
	expect(wrapper.state('animal').description).toEqual('Adorkable')
	expect(wrapper.state('animal').name).toEqual('Bob')

	wrapper.find('.animal-date-of-birth').simulate('change', moment().startOf('week'), {})
	expect(wrapper.state('animal')).toEqual({key: 1, name: 'Bob', description: 'Adorkable', sex: 'Male', date_of_birth: moment().startOf('week')})
})

it('calls the parent onChange function with new state and key prop when a field is changed', () => {
	wrapper.find('.animal-name').simulate('change', {}, {name: 'name', value: 'Bob'})

	expect(fakeOnChange).toHaveBeenCalledWith({key: 1, name: 'Bob', date_of_birth: defaultDOB})
})