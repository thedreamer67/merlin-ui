import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import { useDropzone } from 'react-dropzone';
import DropzonePrompt from './DropzonePrompt';
import './styles/Timeline.css';
import demo from '../../../../assets/demo.mp4';

function Timeline(props) {
	// const [maxFrames, setMaxFrames] = useState(null);

	const baseURL = 'http://127.0.0.1:8000';
	const projectURL = `${baseURL}/project`;
	const timelineURL = `${projectURL}/timeline`;
	const timelineVideoURL = `${projectURL}/timelinevideo`;

	const currentTime = new Date(props.currentTime * 1000)
		.toISOString()
		.substr(11, 8);
	const duration = new Date(props.duration * 1000).toISOString().substr(11, 8);

	const handleScroll = () => {
		const scrollBar = document.getElementById('timeline');
		const maxScrollLeft = scrollBar.scrollWidth - scrollBar.clientWidth;
		const scrollPercentage = scrollBar.scrollLeft / maxScrollLeft;

		props.getScrollPosition(scrollPercentage);
	};

	const handleMouseDown = (e) => {
		const scrollBar = document.getElementById('timeline');
		const maxY =
			scrollBar.getBoundingClientRect()['top'] + scrollBar.clientHeight;
		if (e.clientY > maxY) {
			props.getSeeking(true);
		}
	};

	const handleMouseUp = () => {
		props.getSeeking(false);
	};

	useDropzone({});

	useEffect(() => {
		(async function loadTimeline() {
			const project = await props.fetchProject();
			const timelineVids = project.timelines.map((tl) => {
				return tl.video_objects[0].video_id;
			});
			props.setTimelineVids([...timelineVids]);
			if (timelineVids.length > 0) {
				console.log(`Setting mainTimeline = ${project.timelinevideo_ids[0]}`);
				props.setMainTimeline(project.timelinevideo_ids[0]);
				props.setMaxFrames(project.timelines[0].video_objects[0].frame_end);
			}
		})();
	}, []);

	useEffect(() => {
		async function handleDrop() {
			if (props.isDraggingVid) {
				console.log(`vid ${props.draggingVidID} was dropped here!`);

				await axios
					.post(`${timelineURL}/${props.draggingVidID}`)
					.then((res) => {
						console.log(`Posted new timelinevideo: ${res.data}`);
					})
					.catch((err) => console.log(err));

				let project = await props.fetchProject();
				props.setMainTimeline(project.timelinevideo_ids[0]);
				console.log(`Setting mainTimeline = ${project.timelinevideo_ids[0]}`);

				if (project.audio_path === '') {
					const videoDetails = await axios
						.get(`${timelineVideoURL}/${project.timelinevideo_ids[0]}/details`)
						.then((res) => JSON.parse(res.data))
						.catch((err) => console.log(err));
					console.log(`Main timeline videoID = ${videoDetails.video_id}`);
					await axios
						.put(`${projectURL}/settings?video_id=${videoDetails.video_id}`)
						.then((res) => console.log(res.data))
						.catch((err) => console.log(err));
				}

				project = await props.fetchProject();

				console.log(
					`end frame: ${project.timelines[0].video_objects[0].frame_end}`
				);
				props.setMaxFrames(project.timelines[0].video_objects[0].frame_end);
				const timelineVids = project.timelines.map((tl) => {
					return tl.video_objects[0].video_id;
				});
				props.setTimelineVids([...timelineVids]);
			}
		}
		document
			.getElementById('timelineDropZone')
			.addEventListener('drop', handleDrop);
		return () => {
			try {
				document
					.getElementById('timelineDropZone')
					.removeEventListener('drop', handleDrop);
			} catch (err) {
				console.log(err);
			}
		};
	});

	const deleteTimelines = async () => {
		await axios
			.delete(`${projectURL}/timeline`)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
		const project = await props.fetchProject();
		const timelineVids = project.timelines.map((tl) => {
			return tl.video_objects[0].video_id;
		});
		props.setTimelineVids([...timelineVids]);
		props.setVideoURL(demo);
	};

	return (
		<>
			<div className='timelineheader'>
				<div></div>
				<div className='videoTime'>
					{currentTime}/{duration}
				</div>
				<div className='clearAllIcon'>
					<i className='fa-solid fa-trash' onClick={deleteTimelines}></i>
				</div>
			</div>
			<ScrollSync>
				<div className='mainTimeline'>
					<div
						className={props.timelineVids.length !== 0 ? 'LineScroll' : 'Line'}
					></div>
					<div id='timelineDropZone' style={{ height: '100%' }}>
						<ScrollSyncPane>
							<div
								id='timeline'
								className='timeline'
								onScroll={handleScroll}
								onMouseDown={handleMouseDown}
								onMouseUp={handleMouseUp}
							>
								{props.timelineVids.length !== 0 ? (
									props.timelineVids.map((id) => (
										<ImageCarousel
											handleMagicActionClick={props.handleMagicActionClick}
											isMagicActionActive={props.isMagicActionActive}
											setIsMagicActionActive={props.setIsMagicActionActive}
											videoID={id}
											maxFrames={props.maxFrames}
										/>
									))
								) : (
									<DropzonePrompt />
								)}
							</div>
						</ScrollSyncPane>
					</div>
				</div>
			</ScrollSync>
		</>
	);
}

export default Timeline;
