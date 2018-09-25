import React from 'react'
import { shallow } from 'enzyme'
import { Form, Button } from 'semantic-ui-react'
import WeightMeasurementForm from '../../../components/animals/WeightMeasurementForm.js'
const fakeOnSubmit = jest.fn()

it('displays the input for weight in grams', () => {
	const weightInput = <Form.Input name="weight" className="new-weight-measurement"/>

	const wrapper = shallow(<WeightMeasurementForm />)
	expect(wrapper.containsAnyMatchingElements([weightInput])).toEqual(true)
})

it('displays a submit button', () => {
	const submit = <Button type="submit" className="new-weight-measurement-submit">Submit</Button>

	const wrapper = shallow(<WeightMeasurementForm />)
	expect(wrapper.containsAnyMatchingElements([submit])).toEqual(true)
})

it('sets the weight on the component state when changed', () => {
	const wrapper = shallow(<WeightMeasurementForm />)

	wrapper.find('.new-weight-measurement').first().simulate('change', {}, {name: 'weight', value: 200})

	expect(wrapper.state('weight')).toEqual(200)
})

it('calls the parent onSubmit function with state when the submit button is clicked', () => {
	const wrapper = shallow(<WeightMeasurementForm onSubmit={fakeOnSubmit} />)

	wrapper.find('.new-weight-measurement').first().simulate('change', {}, {name: 'weight', value: 500})
	wrapper.find(Form).simulate('submit')

	expect(fakeOnSubmit).toHaveBeenCalledWith({weight: 500})
})