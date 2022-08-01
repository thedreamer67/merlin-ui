import React, { useState } from 'react';
import Table from './Table';
import Slider from './Slider';
import SearchVideo from './SearchVideo';
import './styles/Search.css';

function Search(props) {
	const [sliderPosition, setSliderPosition] = useState(0);
	const [SearchVideoSeeking, setSearchVideoSeeking] = useState(0);
	const [currentFrame, setCurrentFrame] = useState(1);

	return (
		<div className='SearchContainer'>
			<div className='innerSearchContainer'>
				<div
					style={{
						paddingLeft: '0.5rem',
					}}
				>{`Searching: "${props.query}"`}</div>
				<div className='HeatmapContainer'>
					<div className='videoSearch'>
						<SearchVideo
							currentFrame={currentFrame}
							maxFrames={props.maxFrames}
							setCurrentFrame={setCurrentFrame}
							sliderPosition={sliderPosition}
							setSliderPosition={setSliderPosition}
							SearchVideoSeeking={SearchVideoSeeking}
							setSearchVideoSeeking={setSearchVideoSeeking}
						/>
					</div>
					<img
						className='demoHeatmap'
						src={`data:;base64,${props.heatmap}`}
						alt='No heatmap found'
					></img>
					<Slider
						id='searchscroll'
						className='searchscroll'
						maxFrames={props.maxFrames}
						setSearchVideoSeeking={setSearchVideoSeeking}
						currentFrame={currentFrame}
						setCurrentFrame={setCurrentFrame}
						sliderPosition={sliderPosition}
						setSliderPosition={setSliderPosition}
					/>
				</div>
			</div>
			<div className='TableContainer'>
				<Table
					setSliderPosition={setSliderPosition}
					setSearchVideoSeeking={setSearchVideoSeeking}
					maxFrames={props.maxFrames}
					probabilityData={props.probability}
				/>
			</div>
		</div>
	);
}

export default Search;
