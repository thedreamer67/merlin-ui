import React, { useState } from 'react';
import Table from './Table';
import './styles/Search.css';
import demoHeatmap from '../../../../images/heatmap.png';
import Slider from './Slider';

import ReactPlayer from 'react-player';
import video from '../../../../assets/ogvideo.mp4';
import { useRef, useEffect } from 'react';

const Search = (props) => {
	const [sliderPosition, setSliderPosition] = useState(0);
	const [SearchVideoSeeking, setSearchVideoSeeking] = useState(0);
	const [currentFrame, setcurrentFrame] = useState(1);
	const [maxFrames, setMaxFrames] = useState(400);

	return (
		<div className='SearchContainer'>
			<div className='innerSearchContainer'>
				<div>{`Searching: "${props.query}"`}</div>
				{/* <div>XX number of results</div> */}
				<div className='HeatmapContainer'>
					<div className='videoSearch'>
						<SearchVideo
							currentFrame={currentFrame}
							maxFrames={maxFrames}
							setcurrentFrame={setcurrentFrame}
							sliderPosition={sliderPosition}
							setSliderPosition={setSliderPosition}
							SearchVideoSeeking={SearchVideoSeeking}
							setSearchVideoSeeking={setSearchVideoSeeking}
						/>
					</div>
					<img className='demoHeatmap' src={demoHeatmap}></img>
					<Slider
						id='searchscroll'
						className='searchscroll'
						maxFrames={maxFrames}
						setSearchVideoSeeking={setSearchVideoSeeking}
						currentFrame={currentFrame}
						setcurrentFrame={setcurrentFrame}
						sliderPosition={sliderPosition}
						setSliderPosition={setSliderPosition}
					/>
				</div>
			</div>
			<div className='TableContainer'>
				<Table
					setSliderPosition={setSliderPosition}
					setSearchVideoSeeking={setSearchVideoSeeking}
					maxFrames={maxFrames}
				/>
			</div>
		</div>
	);
};

function SearchVideo(props) {
	const { sliderPosition, setSliderPosition } = props;
	const { maxFrames } = props;
	const SearchVideoRef = useRef(null);
	const [SearchVideoisPlaying, setSearchVideoisPlaying] = useState(false);
	const [SearchVideoHasEnded, setSearchVideoHasEnded] = useState(false);
	const { SearchVideoSeeking, setSearchVideoSeeking } = props;
	const [SearchVideoDuration, setSearchVideoDuration] = useState(0);
	const [SearchVideoPlayed, setSearchVideoPlayed] = useState(0);
	const { currentFrame, setcurrentFrame } = props;
	const [currentSearchVideoPlaybackTime, setCurrentSearchVideoPlaybackTime] =
		useState(0);
	const [controls, setControls] = useState(true);

	const handleSearchVideoProgress = (state) => {
		// console.log('onProgress', state)
		if (!SearchVideoSeeking) {
			setCurrentSearchVideoPlaybackTime(state.playedSeconds);
			// console.log(state.playedSeconds)
			setSliderPosition(state.played);
			const newCurrentFrameIndex = parseInt(sliderPosition * maxFrames);
			setcurrentFrame(newCurrentFrameIndex);
		}
	};

	const handleSearchVideoReady = (duration) => {
		// console.log('onDuration', duration)
		setSearchVideoDuration(SearchVideoRef.current.getDuration());
	};

	const handleSearchVideoEnded = () => {
		SearchVideoisPlaying(false);
		setSearchVideoHasEnded(true);
	};

	useEffect(() => {
		if (SearchVideoSeeking) {
			console.log('seeking...');
			SearchVideoRef.current.seekTo(sliderPosition, 'fraction');
			setCurrentSearchVideoPlaybackTime(
				sliderPosition * SearchVideoRef.current.getDuration()
			);
			setSearchVideoSeeking(false);
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
					controls={controls}
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

export default Search;
