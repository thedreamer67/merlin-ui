import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaskImage = (props) => {
	const baseURL = 'http://127.0.0.1:8000';
	const projectURL = `${baseURL}/project`;
	const videoURL = `${baseURL}/video`;
	const timelineVideoURL = `${projectURL}/timelinevideo`;

	const [newSRC, setNewSRC] = useState(null);

	useEffect(() => {
		(async function getFrame() {
			const videoDetails = await axios
				.get(`${timelineVideoURL}/${props.mainTimeline}/details`)
				.then((res) => {
					console.log(res.data);
					return JSON.parse(res.data);
				})
				.catch((err) => console.log(err));
			props.setVideoDetails(videoDetails);
			setNewSRC(`${videoURL}/${videoDetails.video_id}/frame/${props.frameNum}`);
		})();
	}, []);

	const handleImgClick = (e) => {
		if (props.paintclick) {
			const x = e.pageX - e.target.offsetLeft;
			const y = e.pageY - e.target.offsetTop;
			console.log(
				`e.target.clientHeight = ${e.target.clientHeight}, e.target.clientWidth = ${e.target.clientWidth}`
			);
			const xActual =
				(x / e.target.clientWidth) * props.videoDetails.frame_size[0];
			const yActual =
				(y / e.target.clientHeight) * props.videoDetails.frame_size[1];

			console.log(`Positive clicked with coords = (${xActual},${yActual})`);
			console.log('Fetching mask...');
			(async function sendMaskCoords() {
				await axios
					.put(
						`${videoURL}/${props.videoDetails.video_id}/annotation?frame_num=0`,
						[[xActual, yActual, true]]
					)
					.then((res) => console.log(res.data))
					.catch((err) => console.log(err));
				setNewSRC(`${videoURL}/${props.videoDetails.video_id}/annotation`);
				props.setMaskGenerated(true);
			})();
		}
		if (props.eraserclick) {
			console.log('Negative clicked');
		}
	};

	return (
		<div className='imageContainer'>
			{newSRC && (
				<img
					className='maskCanvas'
					onClick={handleImgClick}
					src={newSRC}
					alt='No frame found'
				></img>
			)}
		</div>
	);
};

export default MaskImage;
