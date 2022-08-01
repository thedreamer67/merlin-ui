import React, { useState } from 'react';
import './styles/FrameTools.css';

function FrameTools(props) {
	const [actionsActionclick, setactionsActionclick] = useState(false);

	const handleactionsActionClick = () => {
		setactionsActionclick(!actionsActionclick);
	};

	function ActionsAction() {
		const [isActive, setIsActive] = useState(false);

		const handleClick = () => {
			setIsActive((current) => !current);
		};

		return (
			<div className='actionContainer'>
				<div
					onClick={handleClick}
					style={{ backgroundColor: isActive ? 'purple' : 'transparent' }}
				>
					<div className='actionTitle'>Crop</div>
				</div>
				<div className='actionTitle'>Duplicate</div>
				<div className='actionTitle'>Split</div>
				<div className='actionTitle'>Delete</div>
			</div>
		);
	}

	return (
		<nav className='frametoolsbar'>
			<div className='uppertoolbar'>
				{actionsActionclick ? <ActionsAction /> : null}
			</div>
			<div className='lowertoolbar'>
				<div
					onClick={handleactionsActionClick}
					style={{
						backgroundColor: actionsActionclick ? 'purple' : 'transparent',
					}}
				>
					<div className='icon-container'>
						<i className='fa-solid fa-scissors'></i>
						<div className='iconTitle'>Actions</div>
					</div>
				</div>
				<div className='icon-container'>
					<i className='fa-solid fa-gauge'></i>
					<div className='iconTitle'>Speed</div>
				</div>
				<div className='icon-container'>
					<i className='fa-solid fa-volume-high'></i>
					<div className='iconTitle'>Volume</div>
				</div>
				<div className='icon-container'>
					<i className='fa-solid fa-compact-disc'></i>
					<div className='iconTitle'>Filters</div>
				</div>
			</div>
		</nav>
	);
}

export default FrameTools;
