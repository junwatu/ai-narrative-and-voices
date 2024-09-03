import React, { useState } from 'react'

const FileUpload = () => {
	const [file, setFile] = useState(null)
	const [uploadStatus, setUploadStatus] = useState('')
	const [uploadData, setUploadData] = useState(null)

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleUpload = async () => {
		if (!file) {
			setUploadStatus('Please select a file first.')
			return
		}

		const formData = new FormData()
		formData.append('file', file)

		try {
			setUploadStatus('Uploading...')
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const data = await response.json()
			setUploadData(data)
			setUploadStatus('Upload successful!')
		} catch (error) {
			console.error('Error uploading file:', error)
			setUploadStatus('Error uploading file. Please try again.')
		}
	}

	return (
		<div>
			<h2>File Upload</h2>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
			<p>{uploadStatus}</p>
			{uploadData && (
				<div>
					<h3>Upload Data:</h3>
					<pre>{JSON.stringify(uploadData, null, 2)}</pre>
				</div>
			)}
		</div>
	)
}

export default FileUpload