import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Editor.module.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Workingpanel from './components/workingpanel';
// import SignUp from "../signup";
// import Library from './Library';
import VideoPlayer from './components/videoplayer';
import Timeline from './components/timeline';
import empty_video from '../../images/empty_video.png'
import og_video from '../../assets/demo.mp4'

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
	const [isAutoCap, setisAutoCap] = useState(false);
	const [frameNum, setFrameNum] = useState(null);
	const [captionclick, setcaptionclick] = useState(false);
	const [spellsclick, setSpellsClick] = useState(true);
	const [isDraggingVid, setIsDraggingVid] = useState(false);
	const [draggingVidID, setDraggingVidID] = useState(null);
	const [project, setProject] = useState(null);
	const [mainTimeline, setMainTimeline] = useState(null); //timelinevideoID, NOT videoID
	const [inpaint, setInpaint] = useState(false);
	const [removeBG, setRemoveBG] = useState(false);
	const [timelineVids, setTimelineVids] = useState([]);
	const [subtitles, setSubtitles] = useState('');
	const [videoURL, setVideoURL] = useState(og_video)
	const [isFinal, setIsFinal] = useState(false)

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
				console.log(`Project details = ${res.data}`);
				return JSON.parse(res.data);
			})
			.catch((err) => console.log(err));
		setProject(project);
		return project;
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
								setisAutoCap={setisAutoCap}
								setIsRemovingBG={setIsRemovingBG}
								setcaptionclick={setcaptionclick}
								captionclick={captionclick}
								spellsclick={spellsclick}
								setSpellsClick={setSpellsClick}
								getTime={storeTime}
								getDuration={storeDuration}
								scrollPosition={scrollPosition}
								getScrollPosition={storeScrollPosition}
								seeking={isSeeking}
								setIsDraggingVid={setIsDraggingVid}
								setDraggingVidID={setDraggingVidID}
								fetchProject={fetchProject}
								frameNum={frameNum}
								mainTimeline={mainTimeline}
								inpaint={inpaint}
								removeBG={removeBG}
								setTimelineVids={setTimelineVids}
								subtitles={subtitles}
								setSubtitles={setSubtitles}
								setVideoURL={setVideoURL}
								setIsFinal={setIsFinal}
								isFinal={isFinal}
							/>
						</div>
						<div className={styles.rightPane}>
							{ timelineVids.length > 0 ? <VideoPlayer
								getTime={storeTime}
								getDuration={storeDuration}
								scrollPosition={scrollPosition}
								getScrollPosition={storeScrollPosition}
								seeking={isSeeking}
								isSpellDragActive={isSpellDragActive}
								isInpainting={isInpainting}
								isRemovingBG={isRemovingBG}
								setFrameNum={setFrameNum}
								isAutoCap={isAutoCap}
								setcaptionclick={setcaptionclick}
								setIsMagicActionActive={setIsMagicActionActive}
								setSpellsClick={setSpellsClick}
								setisSpellDragActive={setisSpellDragActive}
								setIsInpainting={setIsInpainting}
								setisAutoCap={setisAutoCap}
								setIsRemovingBG={setIsRemovingBG}
								fetchProject={fetchProject}
								setInpaint={setInpaint}
								setRemoveBG={setRemoveBG}
								subtitles={subtitles}
								setSubtitles={setSubtitles}
								videoURL={videoURL}
								setVideoURL={setVideoURL}
								project={project}
								isFinal={isFinal}
							/>: <img className='emptyVideo' src={empty_video} /> }
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
						setMainTimeline={setMainTimeline}
						timelineVids={timelineVids}
						setTimelineVids={setTimelineVids}
						setVideoURL={setVideoURL}
					/>
				</div>
			</div>
		</div>
	);
}

export default Editor;
