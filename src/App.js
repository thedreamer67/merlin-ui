import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Workingpanel from './components/workingPanel';
import SignUp from './components/pages/SignUp';
import VideoPlayer from './components/VideoPlayer';

function App() {
	return (
		<Router>
			<Navbar />
			<div className='outersplitScreen'>
				<div className='topPane'>
					<div className='innersplitScreen'>
						<div className='leftPane'>
							<Workingpanel />
						</div>
						<div className='player-wrapper'>
							<VideoPlayer />
						</div>
					</div>
				</div>
				<div className='bottomPane'>
					<h1>Timeline</h1>
				</div>
			</div>
			<Routes>
				<Route path='/sign-up' element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
