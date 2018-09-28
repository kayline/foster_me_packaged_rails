import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import { Form, Button } from 'semantic-ui-react'
import WeightMeasurementForm from '../../../components/animals/WeightMeasurementForm.js'
const fakeUpdateWeights = jest.fn()
var wrapper

beforeEach(() => {
	wrapper = shallow(<WeightMeasurementForm animalId={1} updateWeights={fakeUpdateWeights} />)
})

afterEach(() => {
	fetchMock.restore()
})

it('displays the input for weight in grams', () => {
	const weightInput = <Form.Input name="weight_in_grams" className="new-weight-measurement"/>

	expect(wrapper.containsAnyMatchingElements([weightInput])).toEqual(true)
})

it('displays a submit button', () => {
	const submit = <Button type="submit" className="new-weight-measurement-submit">Submit</Button>

	expect(wrapper.containsAnyMatchingElements([submit])).toEqual(true)
})

it('sets the weight on the component state when changed', () => {
	wrapper.find('.new-weight-measurement').first().simulate('change', {}, {name: 'weight_in_grams', value: 200})

	expect(wrapper.state('weight_in_grams')).toEqual(200)
})

it('posts to the backend with the weight and animal id when the submit button is clicked', () => {
	fetchMock.post('/api/weight_measurements', 201)
	
	wrapper.setState({weight_in_grams: 300})
	wrapper.instance().handleSubmit()

	expect(fetchMock.lastCall()[0]).toEqual('/api/weight_measurements')
	expect(fetchMock.lastCall()[1].body).toEqual(JSON.stringify({weight_in_grams: 300, animal_id: 1}))
	expect(fetchMock.lastCall()[1].method).toEqual('post')
})

it('calls the parent updateWeights function with new weight', async () => {
	fetchMock.post('/api/weight_measurements', {status: 201, body: {weight_in_grams: 300, date: '2018-09-28'}})
	
	wrapper.setState({weight_in_grams: 300})
	await wrapper.instance().handleSubmit()
	wrapper.update()

	expect(fakeUpdateWeights).toHaveBeenCalledWith({weight_in_grams: 300, date: '2018-09-28'})
})