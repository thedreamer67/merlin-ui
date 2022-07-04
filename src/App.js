import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './components/pages/SignUp';

function App() {
  return (
   <Router>
    <Navbar />
    <div className='outersplitScreen'>
      <div className='topPane'>
        <div className='innersplitScreen'>
          <div className='leftPane'>
            <h1>Working Panel</h1>
          </div>
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

export default App;

