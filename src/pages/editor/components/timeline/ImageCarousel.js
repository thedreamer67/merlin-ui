import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FrameTools from './FrameTools';
import Audio from './Audio';
import './styles/ImageCarousel.css';

function ImageCarousel(props) {
	const [frameclick, setFrameclick] = useState(false);
	const [frames, setFrames] = useState(null);

	const baseURL = 'http://127.0.0.1:8000';
	const videoURL = `${baseURL}/video`;

	const handleFrameClick = () => {
		setFrameclick(!frameclick);
	};

	useEffect(() => {
		(async function getVideoDetails() {
			const videoDetails = await axios
				.get(`${videoURL}/${props.videoID}/details`)
				.then((res) => {
					return JSON.parse(res.data);
				})
				.catch((err) => console.log(err));
			const NumOfFrames =
				props.maxFrames < videoDetails.num_of_frames
					? [...Array(props.maxFrames).keys()]
					: [...Array(videoDetails.num_of_frames).keys()];
			setFrames(NumOfFrames);
		})();
	}, []);

	return (
		<section>
			<div style={{ backgroundColor: frameclick ? 'purple' : 'transparent' }}>
				<section
					id='framesPlusPadding'
					className='framesGrid'
					onClick={handleFrameClick}
				>
					<div className='firstPad'></div>
					{frames &&
						frames.map((f) => {
							return (
								<img
									src={`${videoURL}/${props.videoID}/frame/${f}`}
									alt='No frame found'
									className='framesImg'
								/>
							);
						})}
					<div
						style={(function () {
							const timeline = document.getElementById('timeline');
							const scrollBarWidth =
								timeline.offsetWidth - timeline.clientWidth;
							let lastWidth =
								((timeline.offsetWidth / 2 - scrollBarWidth) /
									timeline.offsetWidth) *
								100;
							return { minWidth: lastWidth + 'vw' };
						})()}
					></div>
				</section>
				{document.getElementById('framesPlusPadding') && (
					<Audio
						width={document.getElementById('framesPlusPadding').scrollWidth}
					/>
				)}
			</div>
			{frameclick ? (
				<FrameTools
					handleMagicActionClick={props.handleMagicActionClick}
					isMagicActionActive={props.isMagicActionActive}
				/>
			) : null}
		</section>
	);
}

export default ImageCarousel;
