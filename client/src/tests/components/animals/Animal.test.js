import React from 'react'
import { shallow } from 'enzyme'
import Animal from '../../../components/animals/Animal.js'
var animal, wrapper

beforeEach(() => {
	animal = {
		name: 'Dorbsicle',
		date_of_birth: '2018-07-01',
		profile_photo_path: 'dorbsicle_photo.jpg'
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
