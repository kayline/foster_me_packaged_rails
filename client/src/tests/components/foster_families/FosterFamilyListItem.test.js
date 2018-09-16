import React from 'react'
import { shallow } from 'enzyme'
import fetchMock from 'fetch-mock'
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import FosterFamilyListItem from '../../../components/foster_families/FosterFamilyListItem.js'
const fakeUpdateSuccess = jest.fn()

afterEach(() => {
	fetchMock.restore()
})

it('renders the completion date if present',() => {
	const family = {
		id: 1,
		name: "All Done",
		active: false, 
		completion_date: "2018-04-01"
	}
	const wrapper = shallow(<FosterFamilyListItem family={family} onUpdateSuccess={fakeUpdateSuccess}/>)
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
	const wrapper = shallow(<FosterFamilyListItem family={family} onUpdateSuccess={fakeUpdateSuccess}/>)
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
	const wrapper = shallow(<FosterFamilyListItem family={family} onUpdateSuccess={fakeUpdateSuccess}/>)
	const completionMessage = wrapper.find('.completion-date')

	expect(completionMessage.length).toEqual(0)
})

it('renders a completion button if the family is active', () => {
	const family = {
		id: 1,
		name: "All Done",
		active: true, 
		completion_date: null
	}
	const wrapper = shallow(<FosterFamilyListItem family={family} onUpdateSuccess={fakeUpdateSuccess}/>)
	const completeButton = <Button className="complete-family" content="Completed" />

	expect(wrapper.containsAnyMatchingElements([completeButton])).toEqual(true)
})

it('calls the backend to set family status to complete when the completion button is clicked', async () => {
	fetchMock.post('/api/foster_families/1', {status: 200})
	const today = moment().format('YYYY-M-D')

	const family = {
		id: 1,
		name: "All Done",
		active: true, 
		completion_date: null
	}
	const wrapper = shallow(<FosterFamilyListItem family={family} onUpdateSuccess={fakeUpdateSuccess}/>)
	wrapper.find('.complete-family').simulate('click')

	expect(fetchMock.lastCall()[0]).toEqual('/api/foster_families/1')
	expect(fetchMock.lastCall()[1].body).toEqual(JSON.stringify({family: {active: false, completion_date: today}}))
	expect(fetchMock.lastCall()[1].method).toEqual('post')
})

it('calls the parent onUpdateSuccess method when family update is successful', async () => {
	fetchMock.post('/api/foster_families/1', {status: 200})
	const family = {
		id: 1,
		name: "All Done",
		active: true, 
		completion_date: null
	}

	const wrapper = shallow(<FosterFamilyListItem family={family} onUpdateSuccess={fakeUpdateSuccess}/>)
	await wrapper.instance().onFamilyCompleted()
	wrapper.update()

	expect(fakeUpdateSuccess).toHaveBeenCalled()
})