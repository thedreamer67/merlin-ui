import React, { useState } from 'react';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import './styles/MagicAction.css';
import MaskImage from './MaskImage';
import demo_objectremoved from '../../../../assets/demo_objremoved.mp4';
import demo_bgremoved from '../../../../assets/demo_bgremoved.mp4';

function MagicAction(props) {
	const baseURL = 'http://127.0.0.1:8000';
	const projectURL = `${baseURL}/project`;
	const videoURL = `${baseURL}/video`;
	const timelineVideoURL = `${projectURL}/timelinevideo`;

	const [paintclick, setpaintclick] = useState(false);
	const [videoDetails, setVideoDetails] = useState(null);
	const [maskGenerated, setMaskGenerated] = useState(false);
	const [IsLoading, setIsLoading] = useState(false);

	const handlePaintClick = () => {
		setpaintclick(!paintclick);
		setEraserclick(false);
		setTrashclick(false);
	};

	const [eraserclick, setEraserclick] = useState(false);
	const handleEraserClick = () => {
		setEraserclick(!eraserclick);
		setpaintclick(false);
		setTrashclick(false);
	};

	const [trashclick, setTrashclick] = useState(false);
	const handleTrashClick = () => {
		setTrashclick(!trashclick);
		setpaintclick(false);
		setEraserclick(false);
	};

	const handleDone = async () => {
		if (maskGenerated) {
			setIsLoading(true);

			console.log(`Propagate mask for video ${JSON.stringify(videoDetails)}`);
			await axios
				.put(`${videoURL}/${videoDetails.video_id}/masks`)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));

			let newVideoID;
			if (props.inpaint) {
				console.log('Remove object');
				newVideoID = await axios
					.post(`${videoURL}/${videoDetails.video_id}/inpainting`)
					.then((res) => {
						console.log(`New videoID = ${res.data}`);
						return JSON.parse(res.data);
					})
					.catch((err) => console.log(err));
				setIsLoading(false);
				props.setVideoURL(demo_objectremoved);
			} else if (props.removeBG) {
				console.log('Remove background');
				setIsLoading(true);
				newVideoID = await axios
					.post(`${videoURL}/${videoDetails.video_id}/transparent_background`)
					.then((res) => {
						console.log(`New videoID = ${res.data}`);
						return JSON.parse(res.data);
					})
					.catch((err) => console.log(err));
				setIsLoading(false);
				props.setVideoURL(demo_bgremoved);
			}

			console.log('Change maintimeline video ID to new edited video');
			await axios
				.put(
					`${timelineVideoURL}/${props.mainTimeline}/new_video/${newVideoID}`
				)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));

			// Update project details
			await axios
				.put(`${projectURL}/settings?video_id=${newVideoID}`)
				.then((res) => console.log(res.data))
				.catch((err) => console.log(err));
			const project = await props.fetchProject();
			const timelineVids = project.timelines.map((tl) => {
				return tl.video_objects[0].video_id;
			});
			props.setTimelineVids([...timelineVids]);
		}
		props.setIsMagicActionActive(false);
		props.setSpellsClick(true);
	};

	return (
		<div className='magicActionContainer'>
			<div className='toolbox'>
				<div
					onClick={handlePaintClick}
					style={{ backgroundColor: paintclick ? 'purple' : 'transparent' }}
				>
					<Tooltip
						title='Use this to click on an object to select'
						placement='left-end'
					>
						<div className='toolContainer'>
							<i className='fa-solid fa-paintbrush'></i>
							<div className='toolTitle'>Paint</div>
						</div>
					</Tooltip>
				</div>
				<div
					onClick={handleEraserClick}
					style={{ backgroundColor: eraserclick ? 'purple' : 'transparent' }}
				>
					<Tooltip
						title='Use this to click on an object to unselect'
						placement='left-end'
					>
						<div className='toolContainer'>
							<i className='fa-solid fa-eraser'></i>
							<div className='toolTitle'>Erase</div>
						</div>
					</Tooltip>
				</div>
				<div
					onClick={handleTrashClick}
					style={{ backgroundColor: trashclick ? 'purple' : 'transparent' }}
				>
					<Tooltip
						title='Use this to unselect all objects'
						placement='left-end'
					>
						<div className='toolContainer'>
							<i className='fa-solid fa-trash-can'></i>
							<div className='toolTitle'>Clear All</div>
						</div>
					</Tooltip>
				</div>
				<div className='toolContainer'>
					<i className='fa-solid fa-magnifying-glass-plus'></i>
					<div className='toolTitle'>Zoom In</div>
				</div>
				<div className='toolContainer'>
					<i className='fa-solid fa-magnifying-glass-minus'></i>
					<div className='toolTitle'>Zoom Out</div>
				</div>
				<br />
				<Tooltip title='Click to confirm selection' placement='left-end'>
					<button className='button' onClick={handleDone}>
						Done
					</button>
				</Tooltip>
				{IsLoading && (
					<div
						className='toolContainer'
						style={{ backgroundColor: 'transparent', justifyContent: 'center' }}
					>
						Loading...
					</div>
				)}
			</div>
			<MaskImage
				paintclick={paintclick}
				eraserclick={eraserclick}
				mainTimeline={props.mainTimeline}
				frameNum={props.frameNum}
				videoDetails={videoDetails}
				setVideoDetails={setVideoDetails}
				setMaskGenerated={setMaskGenerated}
			/>
		</div>
	);
}

export default MagicAction;
