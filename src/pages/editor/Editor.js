import React, { useState } from 'react';
import styles from './Editor.module.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Workingpanel from './components/workingpanel';
// import SignUp from "../signup";
// import Library from './Library';
import VideoPlayer from './components/videoplayer';
import Timeline from './components/timeline';

function Editor(props) {
  const { handleStart } = props;
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const storeTime = (currentTime) => {
    setCurrentPlaybackTime(currentTime);
  };

  const StoreDuration = (duration) => {
    setDuration(duration);
  };

  const StoreScrollPosition = (position) => {
    setScrollPosition(position);
    console.log(`editor: storeScrollPosition: position = ${position}`);
  };

  return (
    <div>
      <Navbar handleStart={handleStart} />
      <div className={styles.outersplitScreen}>
        <div className={styles.topPane}>
          <div className={styles.innersplitScreen}>
            <div className={styles.leftPane}>
              <Workingpanel />
            </div>
            <div className={styles.rightPane}>
              <VideoPlayer
                getTime={storeTime}
                getDuration={StoreDuration}
                scrollPosition={scrollPosition}
              />
            </div>
          </div>
        </div>
        <div className={styles.bottomPane}>
          <Timeline
            currentTime={currentPlaybackTime}
            duration={duration}
            getScrollPosition={StoreScrollPosition}
          />
        </div>
      </div>
    </div>
  );
}

export default Editor;
