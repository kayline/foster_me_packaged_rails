import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class PhotoUploadForm extends Component {
	
	onFileSelected = (event) => {
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = (upload) => {
      this.props.onChange({
        data_uri: upload.target.result,
        filename: file.name,
        file_type: file.type
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
			<div className="field file-upload">
		 		<label>{this.props.label}</label>
		 		<input type="file" ref="fileInput" className="file-input" onChange={this.onFileSelected} style={{display: 'none'}} />
			 	<div className="ui action input fileInput">
				 	<input type="text" id="file-name" placeholder={this.props.placeholder} />
	        <label className="ui icon button btn-file select-file-trigger" onClick={this.openFileSelection}>
             <Icon name='attach' />
	        </label>
			 	</div>
			</div>
		)
	}
}

export default PhotoUploadForm