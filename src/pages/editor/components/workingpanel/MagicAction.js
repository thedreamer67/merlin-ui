import React, { useState, useEffect } from 'react';
import './styles/MagicAction.css';
import Tooltip from '@mui/material/Tooltip';
import pic from '../../../../static/000031.jpg';

function MagicAction() {
	const [paintclick, setpaintclick] = useState(false);
	const handlePaintClick = () => {
		setpaintclick(!paintclick);
		setEraserclick(false);
		setTrashclick(false);
	};

	const [eraserclick, setEraserclick] = useState(false);
	const handleEraserClick = () => {
		setEraserclick(!eraserclick);
		setpaintclick(false);
		setTrashclick(false);
	};

	const [trashclick, setTrashclick] = useState(false);
	const handleTrashClick = () => {
		setTrashclick(!trashclick);
		setpaintclick(false);
		setEraserclick(false);
	};

	return (
		<div className='magicActionContainer'>
			<div className='toolbox'>
				<div
					onClick={handlePaintClick}
					style={{ backgroundColor: paintclick ? 'purple' : 'transparent' }}
				>
					<Tooltip
						title='Use this to click on an object to select'
						placement='left-end'
					>
						<div className='toolContainer'>
							<i className='fa-solid fa-paintbrush'></i>
							<div className='toolTitle'>Paint</div>
						</div>
					</Tooltip>
				</div>
				<div
					onClick={handleEraserClick}
					style={{ backgroundColor: eraserclick ? 'purple' : 'transparent' }}
				>
					<Tooltip
						title='Use this to click on an object to unselect'
						placement='left-end'
					>
						<div className='toolContainer'>
							<i className='fa-solid fa-eraser'></i>
							<div className='toolTitle'>Erase</div>
						</div>
					</Tooltip>
				</div>
				<div
					onClick={handleTrashClick}
					style={{ backgroundColor: trashclick ? 'purple' : 'transparent' }}
				>
					<Tooltip
						title='Use this to unselect all objects'
						placement='left-end'
					>
						<div className='toolContainer'>
							<i className='fa-solid fa-trash-can'></i>
							<div className='toolTitle'>Clear All</div>
						</div>
					</Tooltip>
				</div>
				<div className='toolContainer'>
					<i className='fa-solid fa-magnifying-glass-plus'></i>
					<div className='toolTitle'>Zoom In</div>
				</div>
				<div className='toolContainer'>
					<i className='fa-solid fa-magnifying-glass-minus'></i>
					<div className='toolTitle'>Zoom Out</div>
				</div>
				<br />
				<Tooltip title='Click to confirm selection' placement='left-end'>
					<button className='button'>Done</button>
				</Tooltip>
			</div>
			<MaskImage paintclick={paintclick} eraserclick={eraserclick} />
		</div>
	);
}

function MaskImage(props) {
	const { paintclick, eraserclick } = props;
	const [imgclick, setimgclick] = useState(false);
	const handleImgClick = (e) => {
		if (paintclick) {
			console.log('Positive clicked');
			setX(e.pageX - e.target.offsetLeft);
			setY(e.pageY - e.target.offsetTop);
			setimgclick(!imgclick);
			// console.log(x, y);
		}
		if (eraserclick) {
			console.log('Negative clicked');
			setX(e.pageX - e.target.offsetLeft);
			setY(e.pageY - e.target.offsetTop);
			setimgclick(!imgclick);
			// console.log(x, y);
		}
	};
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	//set frame selected to show at start
	const [newSRC, setNewSRC] = useState('https://picsum.photos/200/300');
	useEffect(() => {
		//update image shown each time it is clicked
		if (imgclick) {
			console.log(x, y);
			console.log('Fetching mask...');
			//some code to fetch new mask image from backend
			//after mask is fetched
			setNewSRC(pic);
			console.log('Mask fetched!');
			setimgclick(false); //set to false to display image
		}
	}, [imgclick]);

	return (
		<div className='imageContainer'>
			{imgclick ? null : (
				<img className='maskCanvas' onClick={handleImgClick} src={newSRC}></img>
			)}
			{imgclick ? <Loading /> : null}
		</div>
	);
}

function Loading() {
	return <div>Loading...</div>;
}

export default MagicAction;
