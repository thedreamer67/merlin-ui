import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import video from '../assets/food_recipe.mp4';
import '../styles/VideoPlayer.css';

const VideoPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [played, setPlayed] = useState(0);
	const [hasEnded, setHasEnded] = useState(false);

	const ref = useRef(null);

	const handlePlayPause = () => {
		setIsPlaying((prev) => !prev);
		if (hasEnded) {
			setPlayed(ref.current.getCurrentTime());
			setHasEnded(false);
		}
		console.log(played);
	};

	const handleForward = () => {
		let seekTo = ref.current.getCurrentTime() + 10;
		seekTo =
			seekTo > ref.current.getDuration()
				? Math.floor(ref.current.getDuration())
				: seekTo;
		setPlayed(seekTo);
		ref.current.seekTo(seekTo, 'seconds');
		console.log(seekTo);
	};

	const handleRewind = () => {
		const seekTo = ref.current.getCurrentTime() - 10;
		setPlayed(seekTo);
		ref.current.seekTo(seekTo, 'seconds');
	};

	const handleSeeking = () => {};

	const handleFullscreen = () => {};

	const handleEnded = () => {
		setIsPlaying(false);
		setHasEnded(true);
	};

	// const toggleMute = () => {};

	return (
		<div
			style={{
				// margin: 'auto',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
			}}
		>
			<div>
				<ReactPlayer
					className='react-player'
					width='100%'
					height='100%'
					controls={true}
					playing={isPlaying}
					played={played}
					url={video}
					ref={ref}
					onEnded={handleEnded}
				/>
			</div>

			<section className='controls'>
				<span id='mediaButton' style={{ marginRight: '0.5rem' }}>
					<i className='fa-solid fa-backward-step' onClick={handleRewind} />
				</span>
				{isPlaying ? (
					<span id='mediaButton' style={{ marginRight: '0.5rem' }}>
						<i className='fa-solid fa-pause' onClick={handlePlayPause} />
					</span>
				) : (
					<span id='mediaButton' style={{ marginRight: '0.5rem' }}>
						<i className='fa-solid fa-play' onClick={handlePlayPause} />
					</span>
				)}
				<span id='mediaButton'>
					<i className='fa-solid fa-forward-step' onClick={handleForward} />
				</span>
			</section>
		</div>

		// <video controls className='react-player' width='100%' height='100%'>
		// 	<source src={video} type='video/mp4' />
		// </video>
	);
};

export default VideoPlayer;
