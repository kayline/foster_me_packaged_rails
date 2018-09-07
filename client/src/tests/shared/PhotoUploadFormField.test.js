import React from 'react'
import { mount, shallow } from 'enzyme'
import PhotoUploadFormField from '../../shared/PhotoUploadFormField.js'
import { Icon } from 'semantic-ui-react'
var fakeOnChange, wrapper

beforeEach(() => {
	fakeOnChange = jest.fn()
	wrapper = shallow(<PhotoUploadFormField onChange={fakeOnChange} label='Profile Photo' placeholder='Upload a Photo' />)
})

it('renders the label facade with given props', () => {
	const inputLabel = <label>Profile Photo</label>
	const fileNameDisplay = <input id='file-name' placeholder='Upload a Photo'/>
	const inputTrigger = <Icon name='attach' />
	
	expect(wrapper.containsAnyMatchingElements([inputLabel])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([fileNameDisplay])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([inputTrigger])).toEqual(true)
})

it('renders the hidden input', () => {
	const fileInput = <input type="file" ref="fileInput" style={{display: "none"}} />
	
	expect(wrapper.containsAnyMatchingElements([fileInput])).toEqual(true)
})

it('calls click on the hidden input when the icon is clicked', () => {
	const mountedWrapper = mount(<PhotoUploadFormField onChange={fakeOnChange} />)
	const fileInput = mountedWrapper.ref('fileInput')
	const fakeInputClick = jest.fn()

	fileInput.click = fakeInputClick

	mountedWrapper.find('.select-file-trigger').simulate('click')

	expect(fakeInputClick).toHaveBeenCalled()
	mountedWrapper.unmount()
})

it('calls onFileSelected when the file input changes', () => {
	const fakeOnFileSelected = jest.fn()
	wrapper.instance().onFileSelected = fakeOnFileSelected
	wrapper.instance().forceUpdate()
	
	const fileSelectionEvent = {
		target: {
			files: [{}]
		}
	}
	const fileInput = wrapper.find('.file-input')
	fileInput.simulate('change', fileSelectionEvent)

	expect(fakeOnFileSelected).toHaveBeenCalledWith(fileSelectionEvent)
})
