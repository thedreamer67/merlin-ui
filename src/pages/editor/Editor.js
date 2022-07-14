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
  const [isSeeking, setIsSeeking] = useState(false);
  const [isMagicActionActive, setIsMagicActionActive] = useState(false);
  const [isSpellDragActive, setisSpellDragActive] = useState(false);
  const [isInpainting, setIsInpainting] = useState(false);
  const [isRemovingBG, setIsRemovingBG] = useState(false);
  const [isAutoCap, setisAutoCap] = useState(false);
  const [frameNum, setFrameNum] = useState(null);
  const [captionclick, setcaptionclick] = useState(false);
  const [spellsclick, setSpellsClick] = useState(true);

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
                setisSpellDragActive ={setisSpellDragActive}
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
                isAutoCap={isAutoCap}
                setcaptionclick={setcaptionclick}
                setIsMagicActionActive={setIsMagicActionActive}
                setSpellsClick={setSpellsClick}
                setisSpellDragActive ={setisSpellDragActive}
                setIsInpainting={setIsInpainting}
                setisAutoCap={setisAutoCap}
                setIsRemovingBG={setIsRemovingBG}
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
          />
        </div>
      </div>
    </div>
  );
}

export default Editor;
