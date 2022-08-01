import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import video from '../../../../assets/demo.mp4';

function SearchVideo(props) {
	const [SearchVideoisPlaying, setSearchVideoisPlaying] = useState(false);
	const [SearchVideoPlayed, setSearchVideoPlayed] = useState(0);
	const [ready, setReady] = useState(false);
	const SearchVideoRef = useRef(null);

	const handleSearchVideoProgress = (state) => {
		if (!props.SearchVideoSeeking) {
			props.setSliderPosition(state.played);
			const newCurrentFrameIndex = parseInt(
				props.sliderPosition * props.maxFrames
			);
			props.setCurrentFrame(newCurrentFrameIndex);
		}
	};

	const handleSearchVideoReady = () => {
		setReady(true);
	};

	useEffect(() => {
		setSearchVideoPlayed(
			parseFloat((301 / 367) * SearchVideoRef.current.getDuration())
		);
		props.setSliderPosition(301 / 367);
		SearchVideoRef.current.seekTo(
			parseFloat((301 / 367) * SearchVideoRef.current.getDuration())
		);
	}, [ready]);

	const handleSearchVideoEnded = () => {
		SearchVideoisPlaying(false);
	};

	useEffect(() => {
		if (props.SearchVideoSeeking) {
			console.log('seeking...');
			SearchVideoRef.current.seekTo(props.sliderPosition, 'fraction');
			props.setSearchVideoSeeking(false);
		}
	});

	return (
		<div className='video-component'>
			<div id='video-player' className='react-player'>
				<ReactPlayer
					width='100%'
					height='100%'
					progressInterval={500}
					url={video}
					ref={SearchVideoRef}
					controls={true}
					played={SearchVideoPlayed}
					playing={SearchVideoisPlaying}
					onReady={handleSearchVideoReady}
					onProgress={handleSearchVideoProgress}
					onEnded={handleSearchVideoEnded}
					onPlay={() => setSearchVideoisPlaying(true)}
					onPause={() => setSearchVideoisPlaying(false)}
				/>
			</div>
		</div>
	);
}

export default SearchVideo;
