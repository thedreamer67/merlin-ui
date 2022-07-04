import styles from './Editor.module.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Workingpanel from './WorkingPanel';
import SignUp from '../signup';
// import Library from './Library';
import VideoPlayer from './VideoPlayer'
import React from 'react';

function Editor(props) {
    const { handleStart } = props

    return (
    <div>
        <Navbar handleStart={handleStart}/>
        <div className={styles.outersplitScreen}>
            <div className={styles.topPane}>
                <div className={styles.innersplitScreen}>
                    <div className={styles.leftPane}>
                        <Workingpanel/>
                    </div>
                    <div className={styles.rightPane}>
                        <VideoPlayer/>
                    </div>
                </div>
        </div>
            <div className={styles.bottomPane}>
                <h1>Timeline</h1>
            </div>
        </div>
    </div>
    );
}

export default Editor;

