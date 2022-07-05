import styles from "./Editor.module.css";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import Workingpanel from "./components/workingpanel";
// import SignUp from "../signup";
// import Library from './Library';
import VideoPlayer from "./components/videoplayer";
import React from "react";
import Timeline from "./components/timeline";

function Editor(props) {
  const { handleStart } = props;

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
              <VideoPlayer />
            </div>
          </div>
        </div>
        <div className={styles.bottomPane}>
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default Editor;
