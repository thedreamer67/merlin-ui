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

  const [isMagicActionActive, setIsMagicActionActive] = useState(false);
  const handleMagicActionClick = () => {
      setIsMagicActionActive(!isMagicActionActive);
      console.log(isMagicActionActive)
  };

  return (
    <div>
      {!isEditor ? (
        <Home handleStart={handleStart} />
      ) : (
        <Editor handleStart={handleStart} handleMagicActionClick={handleMagicActionClick} isMagicActionActive={isMagicActionActive} setIsMagicActionActive={setIsMagicActionActive}/>
      )}
    </div>
  );
}

export default App;
