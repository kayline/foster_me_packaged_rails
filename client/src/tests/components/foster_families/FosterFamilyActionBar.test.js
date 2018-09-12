import React from 'react'
import { shallow } from 'enzyme'
import FosterFamilyActionBar from '../../../components/foster_families/FosterFamilyActionBar.js'
import LinkButton from '../../../components/shared/LinkButton.js'

it('has a link to the new foster families page',() => {
	const wrapper = shallow(<FosterFamilyActionBar />)
	const createFamilyButton = <LinkButton className="new-family-button" href="/foster-families/new" content="Add A Foster Family" />

	expect(wrapper.contains(createFamilyButton)).toEqual(true)
})