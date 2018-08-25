import React from 'react'
import { mount, shallow } from 'enzyme'
import fetchMock from 'fetch-mock';
import Home from '../../pages/Home.js'
import Welcome from '../../components/Welcome.js'
import FosterFamilyList from '../../components/foster_families/FosterFamilyList.js'

afterEach(() => {
	fetchMock.restore()
})

it('fetches the current user on mount', () => {
	fetchMock.get('/api/current_user', {status: 200, body: {}})
	const attribution = <p className="attribution">animal paw by rupa c from the Noun Project</p>
	
	const wrapper = shallow(<Home />);
	
	expect(fetchMock.lastUrl()).toEqual('/api/current_user')
	expect(wrapper.contains(attribution)).toEqual(true)
})

it('renders Welcome if the current_user is not present', async () => {
	fetchMock.get('/api/current_user', {status: 401, body: {errors: ['Current user not found']}})
	const welcome = <Welcome/>

  const wrapper = shallow(<Home />);
  await wrapper.instance().componentDidMount()
  wrapper.update()
	
	expect(wrapper.contains(welcome)).toEqual(true)
})

it('renders FosterFamilyList if the current_user is not present', async () => {
	fetchMock.get('/api/current_user', {status: 200, body: {current_user: {email: 'user@test.com'}}})
	const list = <FosterFamilyList/>

  const wrapper = shallow(<Home />);
  await wrapper.instance().componentDidMount()
  wrapper.update()
	
	expect(wrapper.contains(list)).toEqual(true)
})
