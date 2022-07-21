import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/MagicAction.css';
import Tooltip from '@mui/material/Tooltip';
import MaskImage from './MaskImage';
import e from 'cors';
import demo_objectremoved from '../../../../assets/demo_objremoved.mp4'
import bg_removed from '../../../../assets/demo_bgremoved.mp4'

function MagicAction(props) {
	const [paintclick, setpaintclick] = useState(false);
	const [videoDetails, setVideoDetails] = useState(null);
	const [maskGenerated, setMaskGenerated] = useState(false);
	const [IsLoading, setIsLoading] = useState(false);
	const [frameToMask, setFrameToMask] = useState(null);
	const {setVideoURL} = props

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

	const baseURL = 'http://127.0.0.1:8000';
	const projectURL = `${baseURL}/project`;
	const videoURL = `${baseURL}/video`;
	const timelineVideoURL = `${projectURL}/timelinevideo`;

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
				setVideoURL(demo_objectremoved)
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
				setVideoURL(bg_removed)
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

//   return (
//     <div className='magicActionContainer'>
//       <div className='toolbox'>
//         <div
//           onClick={handlePaintClick}
//           style={{ backgroundColor: paintclick ? 'purple' : 'transparent' }}>
//           <Tooltip
//             title='Use this to click on an object to select'
//             placement='left-end'>
//             <div className='toolContainer'>
//               <i className='fa-solid fa-paintbrush'></i>
//               <div className='toolTitle'>Paint</div>
//             </div>
//           </Tooltip>
//         </div>
//         <div
//           onClick={handleEraserClick}
//           style={{ backgroundColor: eraserclick ? 'purple' : 'transparent' }}>
//           <Tooltip
//             title='Use this to click on an object to unselect'
//             placement='left-end'>
//             <div className='toolContainer'>
//               <i className='fa-solid fa-eraser'></i>
//               <div className='toolTitle'>Erase</div>
//             </div>
//           </Tooltip>
//         </div>
//         <div
//           onClick={handleTrashClick}
//           style={{ backgroundColor: trashclick ? 'purple' : 'transparent' }}>
//           <Tooltip
//             title='Use this to unselect all objects'
//             placement='left-end'>
//             <div className='toolContainer'>
//               <i className='fa-solid fa-trash-can'></i>
//               <div className='toolTitle'>Clear All</div>
//             </div>
//           </Tooltip>
//         </div>
//         <div className='toolContainer'>
//           <i className='fa-solid fa-magnifying-glass-plus'></i>
//           <div className='toolTitle'>Zoom In</div>
//         </div>
//         <div className='toolContainer'>
//           <i className='fa-solid fa-magnifying-glass-minus'></i>
//           <div className='toolTitle'>Zoom Out</div>
//         </div>
//         <br />
//         <Tooltip title='Click to confirm selection' placement='left-end'>
//           <button className='button'>Done</button>
//         </Tooltip>
//       </div>
//       <MaskImage
//         paintclick={paintclick}
//         eraserclick={eraserclick}
//         frameToMask={frameToMask}
//         mainTimeline={props.mainTimeline}
//         frameNum={props.frameNum}
//       />
//     </div>
//   );
// }

// function MaskImage(props) {
//   const [newSRC, setNewSRC] = useState(null);
//   const [videoDetails, setVideoDetails] = useState(null);
//   const { paintclick, eraserclick } = props;
//   const [imgclick, setimgclick] = useState(false);
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);

//   const baseURL = 'http://127.0.0.1:8000';
//   const projectURL = `${baseURL}/project`;
//   const videoURL = `${baseURL}/video`;
//   const timelineVideoURL = `${projectURL}/timelinevideo`;

//   useEffect(() => {
//     (async function getFrame() {
//       const videoDetails = await axios
//         .get(`${timelineVideoURL}/${props.mainTimeline}/details`)
//         .then((res) => {
//           console.log(res.data);
//           return JSON.parse(res.data);
//         })
//         .catch((err) => console.log(err));
//       setVideoDetails(videoDetails);
//       setNewSRC(`${videoURL}/${videoDetails.video_id}/frame/${props.frameNum}`);
//     })();
//   }, []);

//   const handleImgClick = (e) => {
//     const x = e.pageX - e.target.offsetLeft;
//     const y = e.pageY - e.target.offsetTop;

//     const xActual = (x / e.target.clientWidth) * videoDetails.frame_size[0];
//     const yActual = (y / e.target.clientHeight) * videoDetails.frame_size[1];

//     if (paintclick) {
//       console.log(`Positive clicked with coords = (${xActual},${yActual})`);
//       console.log('Fetching mask...');
//       (async function sendMaskCoords() {
//         await axios
//           .put(`${videoURL}/${videoDetails.video_id}/annotation?frame_num=0`, [
//             [xActual, yActual, true],
//           ])
//           .then((res) => console.log(res.data))
//           .catch((err) => console.log(err));
//         setNewSRC(`${videoURL}/${videoDetails.video_id}/annotation`);
//       })();
//     }
//     if (eraserclick) {
//       console.log(`Negative clicked with coords = (${xActual},${yActual})`);
//       //TODO logic to implement for eraser click
//     }
//   };

//   return (
//     <div className='imageContainer'>
//       {newSRC && (
//         <img className='maskCanvas' onClick={handleImgClick} src={newSRC}></img>
//       )}
//     </div>
//   );
// }

export default MagicAction;
