import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'semantic-ui-react'
import FosterFamilyActionBar from '../../../components/foster_families/FosterFamilyActionBar.js'

it('has a link to the new foster families page',() => {
	const wrapper = shallow(<FosterFamilyActionBar />)
	const createFamilyButton = <Button primary className="new-family-button"><a href="/foster-families/new">Add A Foster Family</a></Button>

	expect(wrapper.contains(createFamilyButton)).toEqual(true)
})