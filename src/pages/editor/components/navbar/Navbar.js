import React, { useState } from 'react';
import axios from 'axios';
import './styles/Navbar.css';

function Navbar(props) {
	const [click, setClick] = useState(false);

	const baseURL = 'http://127.0.0.1:8000';
	const projectURL = `${baseURL}/project`;

	const handleClick = () => setClick(!click);

	const btnStyle = { cursor: 'pointer' };

	const handleSave = () => {
		(async function saveProject() {
			await axios.put(`${projectURL}/save`);
			console.log('saving project');
			alert('Project saved!');
		})();
	};

	const handleX = () => {
		(async function reloadProject() {
			console.log('quitting');
			await axios.get(`${projectURL}/save`);
		})();
		props.handleStart();
	};

	return (
		<>
			<nav className='navbar'>
				<div
					className='navbar-left-menu'
					onClick={() => props.setIsEditor(false)}
				>
					<i class='fa-solid fa-hat-wizard'></i>
					<div className='nav-title'>MERLIN</div>
				</div>

				<div className='navbar-right-menu'>
					<div className='nav-item'>
						<i
							className='fa-solid fa-floppy-disk'
							style={btnStyle}
							onClick={handleSave}
						></i>
					</div>
					<div className='nav-item'>
						<i className='fa-solid fa-download' style={btnStyle}></i>
					</div>
					<div className='nav-item'>
						<i
							className={
								click
									? 'fa-solid fa-circle-question'
									: 'fa-regular fa-circle-question'
							}
							style={btnStyle}
							onClick={() => handleClick()}
						/>
					</div>
					<div className='nav-item'>
						<i
							className='fa-regular fa-circle-xmark'
							style={btnStyle}
							onClick={handleX}
						></i>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
