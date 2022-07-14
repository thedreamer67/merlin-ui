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
		(async function getProject() {
			const project = await axios
				.get(projectURL)
				.then((res) => {
					return res.data;
				})
				.catch((err) => console.log(err));

			const updatedVideos = await Promise.all(
				JSON.parse(project).library_video_ids.map((id) => {
					return axios
						.get(`${videoURL}/${id}/details`)
						.then((response) => {
							return { id: id, name: JSON.parse(response.data).filename };
						})
						.catch((err) => console.log(err));
				})
			);
			setProjectDetails(JSON.parse(project));
			setVideos(updatedVideos);
			setIsFetchingProject(false);
		})();
	}, []);

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

				(async function getProject() {
					const project = await axios
						.get(projectURL)
						.then((res) => {
							return res.data;
						})
						.catch((err) => console.log(err));

					const updatedVideos = await Promise.all(
						JSON.parse(project).library_video_ids.map((id) => {
							return axios
								.get(`${videoURL}/${id}/details`)
								.then((response) => {
									return { id: id, name: JSON.parse(response.data).filename };
								})
								.catch((err) => console.log(err));
						})
					);
					setProjectDetails(JSON.parse(project));
					setVideos(updatedVideos);
					setIsFetchingProject(false);
					setIsUploading(false);
				})();
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
						const video = videos.filter((vid) => {
							console.log(`vid.id = ${vid}`);
							return vid.id === id;
						});
						if (video) {
							return (
								<File
									thumbnail={`${videoURL}/${id}/frame/0`}
									filename={video[0].name}
									className='file'
								/>
							);
						} else {
							return <>Loading...</>;
						}
					})}
			</div>
		</div>
	);
}

export default Library;
