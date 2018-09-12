import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

class FileUploadFormField extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			filename: "", 
			placeholder: props.placeholder
		}
	}
	
	onFileSelected = (event) => {
		this.setState({
			loading: true,
			placeholder: "Loading File..."
		})

		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = (upload) => {
			this.setState({
				loading: false,
				filename: file.name
			})
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
		if (!this.state.loading) {
			this.refs.fileInput.click()
		}
	}

	render() {
		return (
			<div className="field file-upload">
		 		<label>{this.props.label}</label>
		 		<input type="file" ref="fileInput" className="file-input" onChange={this.onFileSelected} style={{display: 'none'}} />
			 	<div className="ui action input file-input-trigger" onClick={this.openFileSelection}>
				 	<input type="text" className="file-name" disabled="true" placeholder={this.state.placeholder} value={this.state.filename} />
	        <label className="ui icon button btn-file select-file-trigger">
             <Icon name='attach' />
	        </label>
			 	</div>
			</div>
		)
	}
}

export default FileUploadFormField