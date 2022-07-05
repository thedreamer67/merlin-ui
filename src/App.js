import "./App.css";
import Home from "./pages/home";
import Editor from "./pages/editor";
import { useState } from "react";
import React from "react";

function App() {
  const [isEditor, setIsEditor] = useState(false);

  const handleStart = () => {
    setIsEditor(!isEditor);
  };

  return (
    <div>
      {!isEditor ? (
        <Home handleStart={handleStart} />
      ) : (
        <Editor handleStart={handleStart} />
      )}
    </div>
  );
}

export default App;
