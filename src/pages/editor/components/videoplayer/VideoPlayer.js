import React, { useState, useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import video from '../../../../assets/food_recipe.mp4';
import './VideoPlayer.css';

const VideoPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [controls, setControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const ref = useRef(null);

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
    function getFrame(e) {
      if (props.isInpainting || props.isRemovingBG) {
        if (isPlaying) {
          alert('Please pause the video before trying to use a spell!');
        } else {
          const currTime = ref.current.getCurrentTime();
          const fps = 30;
          const frameNum = Math.ceil((1 / (1 / fps)) * currTime);
          props.setFrameNum(frameNum);
          console.log(
            `casting spell, isInpainting=${props.isInpainting} vs isRemovingBG=${props.isRemovingBG}, frameNum=${frameNum}`
          );
        }
      }
    }
    document.getElementById('video-player').addEventListener('drop', getFrame);
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
      <div id='video-player' className='react-player'>
        <ReactPlayer
          // className='react-player'
          width='100%'
          height='100%'
          controls={controls}
          playing={isPlaying}
          played={played}
          muted={isMuted}
          progressInterval={500}
          url={video}
          ref={ref}
          onReady={handleReady}
          onProgress={handleProgress}
          onEnded={handleEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* <section className='controls'>
				{!isMuted && (
					<MediaButton class='fa-solid fa-volume-high' func={toggleMute} />
				)}
				{isMuted && (
					<MediaButton class='fa-solid fa-volume-xmark' func={toggleMute} />
				)}
				<div className='media-controls'>
					<MediaButton class='fa-solid fa-backward-step' func={handleRewind} />

					{isPlaying && (
						<MediaButton class='fa-solid fa-pause' func={handlePlayPause} />
					)}
					{!isPlaying && (
						<MediaButton class='fa-solid fa-play' func={handlePlayPause} />
					)}

					<MediaButton class='fa-solid fa-forward-step' func={handleForward} />
				</div>

				<MediaButton class='fa-solid fa-expand' func={handleFullscreen} />
			</section> */}
    </div>
  );
};

export default VideoPlayer;
