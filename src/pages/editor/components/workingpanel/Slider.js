import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import './styles/Slider.css';

const Slider = (props) => {
	const { maxFrames } = props;
	const { currentFrame, setcurrentFrame } = props;
	const { sliderPosition, setSliderPosition } = props;
	const { setSearchVideoSeeking } = props;

	const handleCurrentFrameChange = (value) => {
		setcurrentFrame(value);
		const sliderPercentage = value / maxFrames;
		setSliderPosition(sliderPercentage);
		setSearchVideoSeeking(true);
	};

	const handleSliderPositionChange = () => {
		const currentFrameIndex = parseInt(sliderPosition * maxFrames);
		console.log('Frame index changed');
		console.log(currentFrameIndex);
		setcurrentFrame(currentFrameIndex);
	};

	const handleMouseDown = (e) => {
		setSearchVideoSeeking(true);
	};

	const handleMouseUp = () => {
		setSearchVideoSeeking(false);
	};

	return (
		<ReactSlider
			className='horizontal-slider'
			thumbClassName='example-thumb'
			trackClassName='example-track'
			max={maxFrames}
			id='slider'
			min='1'
			onChange={(value) => handleCurrentFrameChange(value)}
			value={currentFrame}
			renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			defaultValue={300}
		/>
	);
};
export default Slider;
