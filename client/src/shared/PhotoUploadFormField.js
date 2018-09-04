import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class PhotoUploadForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			photo: {}
		}
	}

	onFileSelected = (event) => {
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = (upload) => {
      this.props.onChange({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };

		reader.readAsDataURL(file)

		return reader.onload
	}

	openFileSelection = () => {
		this.refs.fileInput.click()
	}

	render() {
		return (
			<div className="file-upload-input">
				<Button type="button" className="select-file-button" onClick={this.openFileSelection}>Upload a Photo</Button>
				<input type="file" className="photo-file-input" ref="fileInput" onChange={this.onFileSelected} style={{display: "none"}} />
			</div>
		)
	}
}

export default PhotoUploadForm