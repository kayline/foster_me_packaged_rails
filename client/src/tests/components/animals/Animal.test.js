import React from 'react'
import { shallow } from 'enzyme'
import Animal from '../../../components/animals/Animal.js'
var animal, wrapper

beforeEach(() => {
	const weightMeasurement = { weight_in_grams: 400, date: '2018-09-15' }
	animal = {
		name: 'Dorbsicle',
		date_of_birth: '2018-07-01',
		profile_photo_path: 'dorbsicle_photo.jpg',
		weight_measurements: [weightMeasurement]
	}
	wrapper = shallow(<Animal animal={animal} />);
})

it('renders the Animal', () => {
	const name = <div className="name">My name is Dorbsicle</div>

	expect(wrapper.contains(name)).toEqual(true)
})

it('builds the correct photo url', () => {
	const fullImageUrl = wrapper.state('full_image_url')

	expect(fullImageUrl).toEqual('test.com/blobs/dorbsicle_photo.jpg')
})

it('displays the weight if present', () => {
	const weightMessage = <div className="weight">Weight: 400 grams</div>
	
	expect(wrapper.containsAnyMatchingElements([weightMessage])).toEqual(true)
})

it('displays a message if no weight measurements are present', () => {
	const unweighedAnimal = {
		name: 'Dorbsicle',
		date_of_birth: '2018-07-01',
		profile_photo_path: 'dorbsicle_photo.jpg',
		weight_measurements: []
	}
	wrapper = shallow(<Animal animal={unweighedAnimal} />);

	const weightMessage = <div className="weight">No weight recorded</div>
	
	expect(wrapper.containsAnyMatchingElements([weightMessage])).toEqual(true)
})

it('displays the most recent weight if multiple measurements are present', () => {
	const firstWeight = {weight_in_grams: 200, date: '2018-09-08'}
	const secondWeight = {weight_in_grams: 450, date: '2018-09-15'}

	const veryWeighedAnimal = {
		name: 'Dorbsicle',
		date_of_birth: '2018-07-01',
		profile_photo_path: 'dorbsicle_photo.jpg',
		weight_measurements: [firstWeight, secondWeight]
	}
	wrapper = shallow(<Animal animal={veryWeighedAnimal} />);

	const weightMessage = <div className="weight">Weight: 450 grams</div>
	
	expect(wrapper.containsAnyMatchingElements([weightMessage])).toEqual(true)
})
