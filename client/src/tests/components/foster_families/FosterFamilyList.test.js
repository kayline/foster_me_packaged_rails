import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import FosterFamilyList from '../../../components/foster_families/FosterFamilyList.js'
import FosterFamilyListItem from '../../../components/foster_families/FosterFamilyListItem.js'

afterEach(() => {
	fetchMock.restore()
})

it('fetches all foster families on mount', () => {
	fetchMock.get('/api/foster_families', {status: 200, body: []})
	const container = <div className="families-container"></div>
	
	const wrapper = shallow(<FosterFamilyList />);
	
	expect(fetchMock.lastUrl()).toEqual('/api/foster_families')
	expect(wrapper.contains(container)).toEqual(true)
})

it('renders a list of families for the user', async () => {
	const family = { id: 1, name: 'My Fam' }
	fetchMock.get('/api/foster_families', {status: 200, body: [family]})
	const listItem = <FosterFamilyListItem key={family.id} family={family}/>

  const wrapper = shallow(<FosterFamilyList />);
  await wrapper.instance().componentDidMount()
  wrapper.update()
	
	expect(wrapper.contains(listItem)).toEqual(true)
})

it('renders a message if user has no families', async () => {
	fetchMock.get('/api/foster_families', {status: 200, body: []})

  const wrapper = shallow(<FosterFamilyList />);
  await wrapper.instance().componentDidMount()
  wrapper.update()
	
	expect(wrapper.find('.no-families-message').length).toEqual(1)
})
