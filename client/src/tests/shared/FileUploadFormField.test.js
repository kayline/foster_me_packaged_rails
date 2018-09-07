import React from 'react'
import { mount, shallow } from 'enzyme'
import FileUploadFormField from '../../shared/FileUploadFormField.js'
import { Icon } from 'semantic-ui-react'
var fakeOnChange, wrapper, jsdom

beforeEach(() => {
	fakeOnChange = jest.fn()
	wrapper = shallow(<FileUploadFormField onChange={fakeOnChange} label='Profile Photo' placeholder='Upload a Photo' />)
})

it('renders the label facade with given props', () => {
	const inputLabel = <label>Profile Photo</label>
	const fileNameDisplay = <input className='file-name' disabled="true" placeholder='Upload a Photo' value=""/>
	const inputTrigger = <Icon name='attach' />
	
	expect(wrapper.containsAnyMatchingElements([inputLabel])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([fileNameDisplay])).toEqual(true)
	expect(wrapper.containsAnyMatchingElements([inputTrigger])).toEqual(true)
})

it('sets the initial file state', () => {
	expect(wrapper.state('uploading')).toEqual(false)
	expect(wrapper.state('uploaded')).toEqual(false)
	expect(wrapper.state('placeholder')).toEqual("Upload a Photo")
	expect(wrapper.state('filename')).toEqual("")
})

it('renders the hidden input', () => {
	const fileInput = <input type="file" ref="fileInput" style={{display: "none"}} />
	
	expect(wrapper.containsAnyMatchingElements([fileInput])).toEqual(true)
})

it('calls click on the hidden input when the icon is clicked', () => {
	const mountedWrapper = mount(<FileUploadFormField onChange={fakeOnChange} />)
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

it('sets uploading state when file is selected', () => {
	const file = new window.File([''], 'filename.txt', {
      type: 'text/plain',
      lastModified: new Date()
  })

	const fileSelectionEvent = {
		target: {
			files: [file]
		}
	}

	wrapper.instance().onFileSelected(fileSelectionEvent)
	expect(wrapper.state('uploading')).toEqual(true)
	expect(wrapper.state('filename')).toEqual("")
	expect(wrapper.state('placeholder')).toEqual("Loading File...")
})

it('displays the new placeholder test when a file is loading', () => {
	wrapper.setState({placeholder: "Loading File..."})

	const loadingInput = <input className="file-name" placeholder="Loading File..." value=""/>

	expect(wrapper.containsAnyMatchingElements([loadingInput])).toEqual(true)
})

it('display the filename when the value is not empty', () => {
	wrapper.setState({filename: "I_am_a_file.txt"})

	const loadedInput = <input className="file-name" placeholder="Upload a Photo" value="I_am_a_file.txt"/>

	expect(wrapper.containsAnyMatchingElements([loadedInput])).toEqual(true)
})
