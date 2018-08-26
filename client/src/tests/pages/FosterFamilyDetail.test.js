import React from 'react'
import { mount, shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import FosterFamilyDetail from '../../pages/FosterFamilyDetail.js'
import Animal from '../../components/animals/Animal.js'
import NotFound from '../../pages/NotFound.js'
import { Header } from 'semantic-ui-react'

var fakeRouteInfo

beforeEach(() => {
	fakeRouteInfo = {params: {id: 1 }}
})

afterEach(() => {
	fetchMock.restore()
})

it('fetches the foster family on mount', () => {
	const emptyFamily = { id: 1, animals: []}
	fetchMock.get('/api/foster_families/1', {status: 200, body: emptyFamily})
	const container = <div className="family-container"></div>
	
	const wrapper = shallow(<FosterFamilyDetail match={fakeRouteInfo}/>);
	
	expect(fetchMock.lastUrl()).toEqual('/api/foster_families/1')
	expect(wrapper.contains(container)).toEqual(true)
})

it('renders the family details', async () => {
	const animal = { id: 56, name: 'Adorbs', sex: 'female'}
	const family = { id: 1, name: 'My Fam', animals: [animal]}
	fetchMock.get('/api/foster_families/1', {status: 200, body: family})

	const header = <Header size="large">My Fam</Header>
	const animalItem = <Animal key={animal.id} animal={animal}/>

  const wrapper = shallow(<FosterFamilyDetail match={fakeRouteInfo}/>);
  await wrapper.instance().componentDidMount()
  wrapper.update()
	
	expect(wrapper.contains(header)).toEqual(true)
	expect(wrapper.contains(animalItem)).toEqual(true)
})