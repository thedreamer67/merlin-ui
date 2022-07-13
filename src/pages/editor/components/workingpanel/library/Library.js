import React, { useState } from 'react';
import axios from 'axios';
import './styles/Library.css';

import pic from '../../../../../static/000031.jpg';
import { useEffect } from 'react';

function Library() {
	const baseURL = 'http://127.0.0.1:8000';
	const videoURL = `${baseURL}/video`;
	const projectURL = `${baseURL}/project`;
	const [selectedFile, setSelectedFile] = useState(null);
	const [projectDetails, setProjectDetails] = useState(null);
	const [isFetchingProject, setIsFetchingProject] = useState(true);
	const [isUploading, setIsUploading] = useState(false);
	const [videos, setVideos] = useState([]);
	// const [isFetchingFrames, setIsFetchingFrames] = useState(false);
	// const [thumbnails, setThumbnails] = useState([]);

	useEffect(() => {
		axios
			.get(projectURL)
			.then((res) => {
				setProjectDetails(JSON.parse(res.data));
				setIsFetchingProject(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (projectDetails) {
			console.log('Getting video details');
			projectDetails.library_video_ids.forEach((id) => {
				axios.get(`${videoURL}/${id}/details`).then((res) => {
					setVideos([
						...videos,
						{ id: id, name: JSON.parse(res.data).filename },
					]);
					setIsFetchingProject(false);
				});
			});
		}
	}, [projectDetails]);

	// On file select (from the pop up)
	const onFileChange = (event) => {
		// Update the state
		setSelectedFile(event.target.files[0]);
	};

	// On file upload (click the upload button)
	const onFileUpload = () => {
		if (!selectedFile) {
			alert('Please select a file to upload!');
		} else {
			setIsUploading(true);
			let formData = new FormData();
			formData.append('file', selectedFile, selectedFile.name);
			axios.post(videoURL, formData).then((res) => {
				console.log(res.statusText);

				setIsFetchingProject(true);
				axios.get(projectURL).then((res) => {
					setProjectDetails(JSON.parse(res.data));
					setIsFetchingProject(false);
					setIsUploading(false);
				});
			});
		}
	};

	// File content to be displayed after
	// file upload is complete
	const fileData = () => {
		if (selectedFile) {
			return (
				<div className='fileDetails'>
					<div>File Name: {selectedFile.name}</div>
					<div>File Type: {selectedFile.type}</div>
				</div>
			);
		} else {
			return (
				<div className='fileDetails'>
					<div>Choose before Pressing the Upload button</div>
				</div>
			);
		}
	};

	// const getmedia = () => {
	//     //add url here to get from backend
	//     axios.get(`somemediaurl`)
	//     .then(res => {
	//         const users = res.data;
	//         this.setState({ users });
	//     })
	// }

	const File = (props) => {
		return (
			<div className='libraryPreview'>
				<img
					className='libraryImg'
					alt='Thumbnail not found'
					src={props.thumbnail}
				/>
				<div className='libraryTitle'>{props.filename}</div>
			</div>
		);
	};

	return (
		<div className='libraryPanel'>
			<div className='libraryUpload'>
				<input
					type='file'
					onChange={onFileChange}
					style={{ fontSize: '0.85rem' }}
				/>
				<button className='uploadBtn' onClick={onFileUpload}>
					Upload media
				</button>
				{isUploading && (
					<span style={{ paddingLeft: '1rem' }}>Uploading...</span>
				)}
				{fileData()}
			</div>
			<div className='libraryGrid'>
				{!isFetchingProject &&
					projectDetails.library_video_ids.map((id) => {
						const vidName = 'file.mp4';
						const video = videos.filter((vid) => {
							return vid.id === id;
						});
						console.log(video);
						return (
							<File
								thumbnail={`${videoURL}/${id}/frame/0`}
								filename={video.name}
								className='file'
							/>
						);
						{
							/* } else {
							return <div>Loading...</div>;
						} */
						}
					})}
			</div>
		</div>
	);
}

export default Library;
