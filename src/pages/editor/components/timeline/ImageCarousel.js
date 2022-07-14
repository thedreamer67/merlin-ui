import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/ImageCarousel.css';
import pic from '../../../../static/000031.jpg';
import FrameTools from './FrameTools';

function ImageCarousel(props) {
	const { handleMagicActionClick, isMagicActionActive } = props;
	const [frameclick, setFrameclick] = useState(false);
	const [videoDetails, setVideoDetails] = useState(null);
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
					console.log(res.data);
					return JSON.parse(res.data);
				})
				.catch((err) => console.log(err));
			const frames = [...Array(props.maxFrames).keys()];
			setFrames(frames);
		})();
	}, []);

	return (
		<section>
			<div style={{ backgroundColor: frameclick ? 'purple' : 'transparent' }}>
				<section className='framesGrid' onClick={handleFrameClick}>
					<div className='last'></div>
					{/* {frames && <Frames />} */}
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
			</div>
			{frameclick ? (
				<FrameTools
					handleMagicActionClick={handleMagicActionClick}
					isMagicActionActive={isMagicActionActive}
					// setIsMagicActionActive={setIsMagicActionActive}
				/>
			) : null}
		</section>
	);
}

export default ImageCarousel;

{
	/* <img className='framesImg' src={pic} alt='frame1' />
					<img className='framesImg' src={pic} alt='frame2' />
					<img className='framesImg' src={pic} alt='frame3' />
					<img className='framesImg' src={pic} alt='frame4' />
					<img className='framesImg' src={pic} alt='frame5' />
					<img className='framesImg' src={pic} alt='frame6' />
					<img className='framesImg' src={pic} alt='frame7' />
					<img className='framesImg' src={pic} alt='frame8' />
					<img className='framesImg' src={pic} alt='frame9' />
					<img className='framesImg' src={pic} alt='frame10' />
					<img className='framesImg' src={pic} alt='frame11' />
					<img className='framesImg' src={pic} alt='frame12' />
					<img className='framesImg' src={pic} alt='frame13' />
					<img className='framesImg' src={pic} alt='frame14' />
					<img className='framesImg' src={pic} alt='frame15' />
					<img className='framesImg' src={pic} alt='frame16' />
					<img className='framesImg' src={pic} alt='frame17' />
					<img className='framesImg' src={pic} alt='frame18' />
					<img className='framesImg' src={pic} alt='frame19' />
					<img className='framesImg' src={pic} alt='frame20' /> */
}
