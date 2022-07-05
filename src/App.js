import './App.css';
import Home from './pages/home';
import Editor from './pages/editor';
import { useState } from "react";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/editor/Navbar';
import Workingpanel from './pages/editor/WorkingPanel';
import VideoPlayer from './pages/editor/VideoPlayer'
import Timeline from './pages/editor/Timeline';

function App() {
  const [isEditor, setIsEditor] = useState(false);

  const handleStart = () => {
    setIsEditor(!isEditor)
  }

  return (
    <div>
      {!isEditor ? <Home handleStart={handleStart} /> : <Editor handleStart={handleStart}/>}
    </div>
  );
}

export default App;