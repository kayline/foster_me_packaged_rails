import React from 'react'
import { shallow } from 'enzyme'
import FosterFamilyListItem from '../../../components/foster_families/FosterFamilyListItem.js'

it('renders the completion date if present',() => {
	const family = {
		id: 1,
		name: "All Done",
		active: false, 
		completion_date: "2018-04-01"
	}
	const wrapper = shallow(<FosterFamilyListItem family={family}/>)
	const completionMessage = <span className="completion-date">Completed April 1, 2018</span>

	expect(wrapper.containsAnyMatchingElements([completionMessage])).toEqual(true)
})

it('does not render a message if the completion date is missing',() => {
	const family = {
		id: 1,
		name: "All Done",
		active: false, 
		completion_date: null
	}
	const wrapper = shallow(<FosterFamilyListItem family={family}/>)
	const completionMessage = wrapper.find('.completion-date')

	expect(completionMessage.length).toEqual(0)
})

it('does not render a message if the family is active, even if completion date is present',() => {
	const family = {
		id: 1,
		name: "All Done",
		active: true, 
		completion_date: "2018-04-01"
	}
	const wrapper = shallow(<FosterFamilyListItem family={family}/>)
	const completionMessage = wrapper.find('.completion-date')

	expect(completionMessage.length).toEqual(0)
})