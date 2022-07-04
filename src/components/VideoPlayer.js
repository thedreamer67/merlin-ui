import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import video from '../assets/dargo_interview_cut.mp4';

const VideoPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(true);
	const [played, setPlayed] = useState(0);

	const handlePlayPause = () => {};

	const handleSeeking = () => {};

	const handleFullscreen = () => {};

	// const toggleMute = () => {};

	return (
		<ReactPlayer
			className='react-player'
			width='100%'
			height='100%'
			controls={false}
			playing
			url={video}
		/>
		// <video controls className='react-player' width='100%' height='100%'>
		// 	<source src={video} type='video/mp4' />
		// </video>
	);
};

export default VideoPlayer;
