import React from 'react'
import { shallow } from 'enzyme'
import Animal from '../../../components/animals/Animal.js'
import WeightMeasurementForm from '../../../components/animals/WeightMeasurementForm.js'
var animal, wrapper, fakeClock

beforeEach(() => {
	fakeClock = jest.genMockFromModule('../../../helpers/Clock.js')
	fakeClock.formattedAge = jest.fn(dob => '5 weeks')
	fakeClock.timeSinceRecent = jest.fn(date => '6 days ago')

	const weightMeasurement = { weight_in_grams: 400, date: '2018-09-15' }
	animal = {
		name: 'Dorbsicle',
		description: 'Adorbs',
		date_of_birth: '2018-07-01',
		sex: 'Female',
		profile_photo_path: 'dorbsicle_photo.jpg',
		weight_measurements: [weightMeasurement]
	}
	wrapper = shallow(<Animal animal={animal} clock={fakeClock}/>);
})

it('renders the Animal info', () => {
	const name = <div className="name">My name is Dorbsicle</div>
	const description = <div>Adorbs</div>
	const age = <div>Age: 5 weeks</div>
	const sex = <div>Sex: Female</div>

	expect(wrapper.contains(name)).toEqual(true)
	expect(wrapper.contains(description)).toEqual(true)
	expect(wrapper.contains(age)).toEqual(true)
	expect(wrapper.contains(sex)).toEqual(true)
})

it('builds the correct photo url', () => {
	const fullImageUrl = wrapper.state('full_image_url')

	expect(fullImageUrl).toEqual('test.com/blobs/dorbsicle_photo.jpg')
})

it('displays the weight if present', () => {
	const weightMessage = <div className="weight">Weight: 400 grams, measured 6 days ago</div>
	
	expect(wrapper.containsAnyMatchingElements([weightMessage])).toEqual(true)
})

it('displays a message if no weight measurements are present', () => {
	const unweighedAnimal = {
		name: 'Dorbsicle',
		date_of_birth: '2018-07-01',
		profile_photo_path: 'dorbsicle_photo.jpg',
		weight_measurements: []
	}
	wrapper = shallow(<Animal animal={unweighedAnimal} clock={fakeClock}/>);

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
	wrapper = shallow(<Animal animal={veryWeighedAnimal} clock={fakeClock}/>);

	const weightMessage = <div className="weight">Weight: 450 grams, measured 6 days ago</div>

	expect(wrapper.containsAnyMatchingElements([weightMessage])).toEqual(true)
})

it('displays the weight measurement form', () => {
	const unweighedAnimal = {
		id: 5,
		name: 'Dorbsicle',
		date_of_birth: '2018-07-01',
		profile_photo_path: 'dorbsicle_photo.jpg',
		weight_measurements: []
	}
	wrapper = shallow(<Animal animal={unweighedAnimal} clock={fakeClock}/>);

	const form = <WeightMeasurementForm animalId={5}/>
	expect(wrapper.containsAnyMatchingElements([form])).toEqual(true)
})

it('updates the weights with the response from the form', () => {
	wrapper.instance().addWeightMeasurement({weight_in_grams: 450, date: '2018-09-28'})

	const weightMessage = <div className="weight">Weight: 450 grams, measured 6 days ago</div>

	expect(wrapper.containsAnyMatchingElements([weightMessage])).toEqual(true)
})
