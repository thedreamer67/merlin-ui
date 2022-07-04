import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Workingpanel from './components/WorkingPanel';
import SignUp from './components/pages/SignUp';
import Library from './components/Library';
import VideoPlayer from './components/VideoPlayer'

function App() {
  return (
   <Router>
    
    <Routes>
    <Route path='/'  />
    <Route path='/library' />
    <Route path='/exit' element={<SignUp/>} />
    </Routes>

    <Navbar />
    <div className='outersplitScreen'>
      <div className='topPane'>
        <div className='innersplitScreen'>
          <div className='leftPane'>
            <Workingpanel/>
          </div>
          <div className='rightPane'>
            <VideoPlayer/>
          </div>
        </div>
      </div>
      <div className='bottomPane'>
        <h1>Timeline</h1>
      </div>
    </div>
    
   </Router>
  );
}

export default App;
