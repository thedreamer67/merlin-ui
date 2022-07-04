import './App.css';
import Home from './pages/home';
import Editor from './pages/editor';
import { useState } from "react";

function App() {
  const [isEditor, setIsEditor] = useState(false);

  const handleStart = () => {
    setIsEditor(true)
  }

  return (
    <div>
      {!isEditor ? <Home handleStart={handleStart} /> : <Editor/>}
    </div>
  );
}

export default App;

