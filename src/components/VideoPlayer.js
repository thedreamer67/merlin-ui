import React, { useState, useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import video from '../assets/food_recipe.mp4';
import '../styles/VideoPlayer.css';

const VideoPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [played, setPlayed] = useState(0);
	const [controls, setControls] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [hasEnded, setHasEnded] = useState(false);

	const ref = useRef(null);

	useEffect(() => {
		function onFullscreenChange() {
			setControls(Boolean(document.fullscreenElement));
		}
		document.addEventListener('fullscreenchange', onFullscreenChange);
		return () =>
			document.removeEventListener('fullscreenchange', onFullscreenChange);
	}, []);

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

	const handleFullscreen = () => {
		screenfull.request(findDOMNode(ref.current));
		setControls(true);
	};

	const handleEnded = () => {
		setIsPlaying(false);
		setHasEnded(true);
	};

	const toggleMute = () => {
		setIsMuted((prev) => !prev);
	};

	return (
		<div className='video-component'>
			<div>
				<ReactPlayer
					className='react-player'
					width='100%'
					height='100%'
					controls={controls}
					playing={isPlaying}
					played={played}
					muted={isMuted}
					url={video}
					ref={ref}
					onEnded={handleEnded}
				/>
			</div>

			<section className='controls'>
				<span id='mediaButton' style={{ marginRight: '5rem' }}>
					{!isMuted && (
						<i class='fa-solid fa-volume-high' onClick={toggleMute} />
					)}
					{isMuted && (
						<i class='fa-solid fa-volume-xmark' onClick={toggleMute} />
					)}
				</span>

				<span id='mediaButton' style={{ marginRight: '0.5rem' }}>
					<i className='fa-solid fa-backward-step' onClick={handleRewind} />
				</span>

				<span id='mediaButton' style={{ marginRight: '0.5rem' }}>
					{isPlaying && (
						<i className='fa-solid fa-pause' onClick={handlePlayPause} />
					)}
					{!isPlaying && (
						<i className='fa-solid fa-play' onClick={handlePlayPause} />
					)}
				</span>

				<span id='mediaButton' style={{ marginRight: '5rem' }}>
					<i className='fa-solid fa-forward-step' onClick={handleForward} />
				</span>

				<span id='mediaButton'>
					<i class='fa-solid fa-expand' onClick={handleFullscreen} />
				</span>
			</section>
		</div>
	);
};

export default VideoPlayer;
