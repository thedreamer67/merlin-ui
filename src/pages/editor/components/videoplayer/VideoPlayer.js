import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import video from '../../../../assets/ogvideo.mp4';
import './VideoPlayer.css';
import PF_SRT from '../workingpanel/autocaption/subtitles';

const VideoPlayer = (props) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [played, setPlayed] = useState(0);
	const [controls, setControls] = useState(true);
	const [isMuted, setIsMuted] = useState(false);
	const [hasEnded, setHasEnded] = useState(false);
	const { isSpellDragActive } = props;
	const { subtitles, setSubtitles } = props;

	const baseURL = 'http://127.0.0.1:8000';
	const outputVideoURL = `${baseURL}/output_video`;

	const ref = useRef(null);
	const axios = require('axios');
	const captionURL = `${baseURL}/captions`;

	// useEffect(() => {
	// 	function onFullscreenChange() {
	// 		setControls(Boolean(document.fullscreenElement));
	// 	}
	// 	document.addEventListener('fullscreenchange', onFullscreenChange);
	// 	return () =>
	// 		document.removeEventListener('fullscreenchange', onFullscreenChange);
	// }, []);

	useEffect(() => {
		function onScroll() {
			// props.seeking &&
			// console.log(
			// 	`videoplayer: useEffect onScroll: props.scrollPosition = ${props.scrollPosition}`
			// );
			if (props.seeking) {
				ref.current.seekTo(props.scrollPosition, 'fraction');
				props.getTime(props.scrollPosition * ref.current.getDuration());
			}
			// props.seeking &&
			// ref.current.seekTo(props.scrollPosition, 'fraction');
		}
		document.getElementById('timeline').addEventListener('scroll', onScroll);
		return () => {
			try {
				document
					.getElementById('timeline')
					.removeEventListener('scroll', onScroll);
			} catch (err) {
				// do nothing
				console.log(err);
			}
		};
	});

	useEffect(() => {
		function onMouseWheel(e) {
			// e.shiftKey &&
			// 	console.log(
			// 		`videoplayer: useEffect onMouseWheel: props.scrollPosition = ${props.scrollPosition}`
			// 	);
			e.shiftKey && ref.current.seekTo(props.scrollPosition, 'fraction');
		}
		document
			.getElementById('timeline')
			.addEventListener('mousewheel', onMouseWheel);
		return () => {
			try {
				document
					.getElementById('timeline')
					.removeEventListener('mousewheel', onMouseWheel);
			} catch (err) {
				// do nothing
				console.log(err);
			}
		};
	});

	useEffect(() => {
		async function getFrame(e) {
			if (props.isInpainting || props.isRemovingBG) {
				if (isPlaying) {
					alert('Please pause the video before trying to use a spell!');
				} else {
					const currTime = ref.current.getCurrentTime();
					const project = await props.fetchProject();
					const fps = project.project_fps;
					const frameNum = Math.floor(fps * currTime);
					props.setFrameNum(frameNum);
					console.log(
						`casting spell, isInpainting=${props.isInpainting} vs isRemovingBG=${props.isRemovingBG}, time=${currTime}, frameNum=${frameNum}`
					);
					props.setInpaint(props.isInpainting);
					props.setRemoveBG(props.isRemovingBG);
					props.setIsMagicActionActive(true);
					props.setcaptionclick(false);
					props.setSpellsClick(false);
					props.setisSpellDragActive(false);
				}
			}
		}
		// TODO:
		if (!true) {
			document.getElementById('video-player').addEventListener('drop', getFrame);
		}

		return () => {
			try {
				document
					.getElementById('video-player')
					.removeEventListener('drop', getFrame);
			} catch (err) {
				console.log(err);
			}
		};
	});

	async function getCaption() {
		const captionFile = await axios
			.get(captionURL)
			.then((res) => {
				// console.log(res.data)
				return PF_SRT.parse(res.data);
			})
			.catch((err) => console.log(err));
		return captionFile;
	}

	async function generateCaption() {
		const payload = {};
		const caption = await axios
			.post(captionURL, payload)
			.then((res) => {
				// console.log(res.status);
				// console.log(res)
				return res.status;
			})
			.catch((err) => console.log(err));
		return caption;
	}

	async function initCaption() {
		const generatingCaption = await generateCaption();
		if (generatingCaption === 200) {
			const captionRetrieved = await getCaption();
			console.log(captionRetrieved);
			setSubtitles(captionRetrieved);
			props.setcaptionclick(true);
		} else {
			alert('Caption generation is unsuccessful.');
		}
	}

	useEffect(() => {
		function getCap(e) {
			if (props.isAutoCap) {
				props.setIsMagicActionActive(false);
				props.setSpellsClick(false);
				props.setisSpellDragActive(false);
				initCaption();
			}
		}
		
		// TODO:
		if (!true) {
			document.getElementById('video-player').addEventListener('drop', getCap);
		}
		return () => {
			try {
				document
					.getElementById('video-player')
					.removeEventListener('drop', getCap);
			} catch (err) {
				console.log(err);
			}
		};
	});

	// const handlePlayPause = () => {
	// 	setIsPlaying((prev) => !prev);
	// 	if (hasEnded) {
	// 		setPlayed(ref.current.getCurrentTime());
	// 		setHasEnded(false);
	// 	}
	// };

	// const handleForward = () => {
	// 	let seekTo = ref.current.getCurrentTime() + 10;
	// 	seekTo =
	// 		seekTo > ref.current.getDuration()
	// 			? Math.floor(ref.current.getDuration())
	// 			: seekTo;
	// 	setPlayed(seekTo);
	// 	ref.current.seekTo(seekTo, 'seconds');
	// };

	// const handleRewind = () => {
	// 	const seekTo = ref.current.getCurrentTime() - 10;
	// 	setPlayed(seekTo);
	// 	ref.current.seekTo(seekTo, 'seconds');
	// };

	// const handleSeeking = () => {};

	const handleReady = () => {
		props.getDuration(ref.current.getDuration());
	};

	const handleProgress = (state) => {
		// console.log('onProgress props.seeking', props.seeking);
		if (!props.seeking) {
			props.getTime(state.playedSeconds);
			const scrollBar = document.getElementById('timeline');
			const maxScrollLeft = scrollBar.scrollWidth - scrollBar.clientWidth;
			const newScrollPosition = state.played * maxScrollLeft;
			props.getScrollPosition(state.played);
			scrollBar.scrollTo(newScrollPosition, scrollBar.scrollTop);
			// console.log(`update to new position at ${newScrollPosition}`);
		}
	};

	// const handleFullscreen = () => {
	// 	screenfull.request(findDOMNode(ref.current));
	// 	setControls(true);
	// };

	const handleEnded = () => {
		setIsPlaying(false);
		setHasEnded(true);
	};

	// const toggleMute = () => {
	// 	setIsMuted((prev) => !prev);
	// };

	// const MediaButton = (props) => {
	// 	return <i id='mediaButton' className={props.class} onClick={props.func} />;
	// };

	return (
		<div className='video-component'>
			{ false ?
			<></> :
			<div
				id='video-player'
				className={isSpellDragActive ? 'react-player-dropzone' : 'react-player'}
			>
				<ReactPlayer
					id='react-player'
					width='100%'
					height='100%'
					controls={controls}
					playing={isPlaying}
					played={played}
					muted={isMuted}
					progressInterval={500}
					url={props.renderedVideo}
					ref={ref}
					onReady={handleReady}
					onProgress={handleProgress}
					onEnded={handleEnded}
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
				/>
			</div>
			}
		</div>
	);
};

export default VideoPlayer;
