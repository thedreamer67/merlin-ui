import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Workingpanel from './components/workingPanel';
import SignUp from './components/pages/SignUp';

function Editor() {
  return (
   <Router>
    <Navbar />
    <div className='outersplitScreen'>
      <div className='topPane'>
        <div className='innersplitScreen'>
          <Workingpanel/>
          <div className='rightPane'>
            <h1>Movie Panel</h1>
          </div>
        </div>
      </div>
      <div className='bottomPane'>
        <h1>Timeline</h1>
      </div>
    </div>
    <Routes>
    <Route path='/sign-up' element={<SignUp/>} />
    </Routes>
   </Router>
  );
}

export default Editor;

