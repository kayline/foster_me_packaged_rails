import React from 'react'
import { mount, shallow } from 'enzyme'
import PhotoUploadFormField from '../../shared/PhotoUploadFormField.js'
import { Button } from 'semantic-ui-react'
var fakeOnChange, wrapper

beforeEach(() => {
	fakeOnChange = jest.fn()
	wrapper = shallow(<PhotoUploadFormField onChange={fakeOnChange} />)
})

it('renders the visible button', () => {
	const actionButton = <Button type="button" className="select-file-button">Upload a Photo</Button>
	
	expect(wrapper.containsAnyMatchingElements([actionButton])).toEqual(true)
})

it('renders the hidden input', () => {
	const fileInput = <input type="file" ref="fileInput" style={{display: "none"}} />
	
	expect(wrapper.containsAnyMatchingElements([fileInput])).toEqual(true)
})

it('calls click on the hidden input when the button is clicked', () => {
	const mountedWrapper = mount(<PhotoUploadFormField onChange={fakeOnChange} />)
	const fileInput = mountedWrapper.ref('fileInput')
	const fakeInputClick = jest.fn()

	fileInput.click = fakeInputClick

	mountedWrapper.find('button.select-file-button').simulate('click')

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
	const fileInput = wrapper.find('.photo-file-input')
	fileInput.simulate('change', fileSelectionEvent)

	expect(fakeOnFileSelected).toHaveBeenCalledWith(fileSelectionEvent)
})
