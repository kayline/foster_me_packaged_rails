import React from 'react'
import { mount, shallow } from 'enzyme'
import fetchMock from 'fetch-mock';
import Home from '../../pages/Home.js'
import FosterFamilyList from '../../components/foster_families/FosterFamilyList.js'

it('renders FosterFamilyList', () => {
	const list = <FosterFamilyList/>

  const wrapper = shallow(<Home />);
	
	expect(wrapper.contains(list)).toEqual(true)
})
