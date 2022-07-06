import React from 'react';
import ImageCarousel from './ImageCarousel';
import './styles/Timeline.css';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
// import { groupProps } from 'utila/lib/object';

function Timeline(props) {
	const currentTime = new Date(props.currentTime * 1000)
		.toISOString()
		.substr(11, 8);
	const duration = new Date(props.duration * 1000).toISOString().substr(11, 8);

	const handleScroll = () => {
		const scrollBar = document.getElementById('timeline');
		const maxScrollLeft = scrollBar.scrollWidth - scrollBar.clientWidth;
		const scrollPercentage = scrollBar.scrollLeft / maxScrollLeft;

		props.getScrollPosition(scrollPercentage);
		console.log(
			`timeline: handleScroll: scrollPercentage = ${scrollPercentage}`
		);
	};

	const handleMouseDown = () => {
		props.getSeeking(true);
		console.log(`mouseDown`);
	};

	const handleMouseUp = () => {
		props.getSeeking(false);
		console.log(`mouseUp`);
	};

	const handleDragEnd = () => {
		props.getSeeking(false);
		console.log(`dragend`);
	};

	// const coords = (e) => {
	// 	console.log(e.clientY);
	// };

	return (
		<>
			<div className='videoTime'>
				{currentTime}/{duration}
			</div>
			<ScrollSync>
				<div className='mainTimeline'>
					<ScrollSyncPane>
						<div
							id='timeline'
							style={{ overflow: 'auto', height: '100vh' }}
							onScroll={handleScroll}
							onMouseDown={handleMouseDown}
							onMouseUp={handleMouseUp}
							onDragEnd={handleDragEnd}
							// onClick={coords}
						>
							<ImageCarousel />
							<ImageCarousel />
						</div>
					</ScrollSyncPane>
				</div>
			</ScrollSync>
		</>
	);
}

export default Timeline;
