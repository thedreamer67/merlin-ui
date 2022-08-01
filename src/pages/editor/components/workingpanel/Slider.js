import React from 'react';
import ReactSlider from 'react-slider';
import './styles/Slider.css';

const Slider = (props) => {
	const handleCurrentFrameChange = (value) => {
		props.setCurrentFrame(value);
		const sliderPercentage = value / props.maxFrames;
		props.setSliderPosition(sliderPercentage);
		props.setSearchVideoSeeking(true);
	};

	const handleMouseDown = (e) => {
		props.setSearchVideoSeeking(true);
	};

	const handleMouseUp = () => {
		props.setSearchVideoSeeking(false);
	};

	return (
		<ReactSlider
			className='horizontal-slider'
			thumbClassName='example-thumb'
			trackClassName='example-track'
			max={props.maxFrames}
			id='slider'
			min='1'
			onChange={(value) => handleCurrentFrameChange(value)}
			value={props.currentFrame}
			renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		/>
	);
};

export default Slider;
