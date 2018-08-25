import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock';
import Home from '../../pages/Home.js'

var currentUserRequest

beforeEach(() => {
	fetchMock.get('/api/current_user', 200)
})

it('fetches the current user on mount',() => {
	const wrapper = shallow(<Home />);
	expect(fetchMock.lastUrl()).toEqual('/api/current_user')
})