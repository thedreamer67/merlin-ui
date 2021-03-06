import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import './VideoPlayer.css';
import demo_bgreplaced from '../../../../assets/demo_bgreplaced.mp4';
import demo_final from '../../../../assets/demo_final.mp4';

const VideoPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [controls, setControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const { isSpellDragActive } = props;
  const { subtitles, setSubtitles } = props;
  const { videoURL, setVideoURL } = props;
  const { project } = props;

  const baseURL = 'http://127.0.0.1:8000';
  const outputVideoURL = `${baseURL}/demo/final`;

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

  var PF_SRT = (function () {
    var pattern =
      /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|=\n{2}))/gm;
    var _regExp;

    var init = function () {
      _regExp = new RegExp(pattern);
    };

    var parse = function (f) {
      if (typeof f != 'string') throw 'Sorry, Parser accept string only.';

      var result = [];
      if (f == null) return {};

      f = f.replace(/\r\n|\r|\n/g, '\n');

      let matches = 0;

      while ((matches = pattern.exec(f)) != null) {
        result.push(toLineObj(matches));
      }
      return result;
    };
    var toLineObj = function (group) {
      return {
        line: group[1],
        startTime: group[2],
        endTime: group[3],
        text: group[4],
      };
    };
    init();
    return {
      parse: parse,
    };
  })();

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
    document.getElementById('video-player').addEventListener('drop', getCap);
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

  useEffect(() => {
    (async function getVid() {
      const project = await props.fetchProject();
      if (project.timelinevideo_ids.length === 2) {
        if (props.isFinal) {
          setVideoURL(demo_final);
        } else {
          setVideoURL(demo_bgreplaced);
        }
      }
    })();
  }, [props.timelineVids, props.isFinal]);

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
      <div
        id='video-player'
        className={
          isSpellDragActive && props.timelineVids.length > 0
            ? 'react-player-dropzone'
            : 'react-player'
        }>
        {props.timelineVids.length > 0 && (
          <ReactPlayer
            // className='react-player'
            width='100%'
            height='100%'
            controls={controls}
            playing={isPlaying}
            played={played}
            muted={isMuted}
            progressInterval={500}
            url={videoURL}
            ref={ref}
            onReady={handleReady}
            onProgress={handleProgress}
            onEnded={handleEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
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
