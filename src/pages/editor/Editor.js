import React, { useState } from 'react';
import axios from 'axios';
import styles from './Editor.module.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Workingpanel from './components/workingpanel';
// import SignUp from "../signup";
// import Library from './Library';
import VideoPlayer from './components/videoplayer';
import Timeline from './components/timeline';

function Editor(props) {
	const baseURL = 'http://127.0.0.1:8000';
	const projectURL = `${baseURL}/project`;

	const { handleStart } = props;
	const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isSeeking, setIsSeeking] = useState(false);
	const [isMagicActionActive, setIsMagicActionActive] = useState(false);
	const [isSpellDragActive, setisSpellDragActive] = useState(false);
	const [isInpainting, setIsInpainting] = useState(false);
	const [isRemovingBG, setIsRemovingBG] = useState(false);
	const [isDraggingVid, setIsDraggingVid] = useState(false);
	const [draggingVidID, setDraggingVidID] = useState(null);
	const [frameNum, setFrameNum] = useState(null);
	const [project, setProject] = useState(null);

	const storeTime = (currentTime) => {
		setCurrentPlaybackTime(currentTime);
	};

	const storeDuration = (duration) => {
		setDuration(duration);
	};

	const storeScrollPosition = (position) => {
		setScrollPosition(position); //should be a fraction! [0,1]
		// console.log(`editor: storeScrollPosition: position = ${position}`);
	};

	const storeIsSeeking = (seeking) => {
		setIsSeeking(seeking);
		// console.log(`editor setIsSeeking = ${seeking}`);
	};

	const handleMagicActionClick = () => {
		setIsMagicActionActive(!isMagicActionActive);
	};

	const fetchProject = async () => {
		const project = await axios
			.get(projectURL)
			.then((res) => {
				return JSON.parse(res.data);
			})
			.catch((err) => console.log(err));
		setProject(project);
	};

	return (
		<div className={styles.editorMain}>
			<Navbar handleStart={handleStart} />
			<div className={styles.outersplitScreen}>
				<div className={styles.topPane}>
					<div className={styles.innersplitScreen}>
						<div className={styles.leftPane}>
							<Workingpanel
								isMagicActionActive={isMagicActionActive}
								setIsMagicActionActive={setIsMagicActionActive}
								setisSpellDragActive={setisSpellDragActive}
								setIsInpainting={setIsInpainting}
								setIsRemovingBG={setIsRemovingBG}
								setIsDraggingVid={setIsDraggingVid}
								setDraggingVidID={setDraggingVidID}
								fetchProject={fetchProject}
							/>
						</div>
						<div className={styles.rightPane}>
							<VideoPlayer
								getTime={storeTime}
								getDuration={storeDuration}
								scrollPosition={scrollPosition}
								getScrollPosition={storeScrollPosition}
								seeking={isSeeking}
								isSpellDragActive={isSpellDragActive}
								isInpainting={isInpainting}
								isRemovingBG={isRemovingBG}
								setFrameNum={setFrameNum}
								fetchProject={fetchProject}
							/>
						</div>
					</div>
				</div>
				<div className={styles.bottomPane}>
					<Timeline
						currentTime={currentPlaybackTime}
						duration={duration}
						getScrollPosition={storeScrollPosition}
						getSeeking={storeIsSeeking}
						handleMagicActionClick={handleMagicActionClick}
						isMagicActionActive={isMagicActionActive}
						setIsMagicActionActive={setIsMagicActionActive}
						isDraggingVid={isDraggingVid}
						draggingVidID={draggingVidID}
						fetchProject={fetchProject}
					/>
				</div>
			</div>
		</div>
	);
}

export default Editor;
