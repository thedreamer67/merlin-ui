import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import './styles/Spells.css';
import original from '../../../../images/homebackground.jpg';
import backgroundAfter from '../../../../images/backgroundAfter.png';
import backgroundBefore from '../../../../images/backgroundBefore.png';
import objectBefore from '../../../../images/objectBefore.png';
import objectAfter from '../../../../images/objectAfter.jpg';
import autoCap from '../../../../images/autocap.jpg';

function Spells(props) {
	const [demoImgSRC1, setDemoImgSRC1] = useState(objectBefore);
	const [demoImgSRC2, setDemoImgSRC2] = useState(objectAfter);
	const { setisSpellDragActive } = props;
	const { setIsMagicActionActive } = props;

	const handleRemoveObjectHover = () => {
		setDemoImgSRC1(objectBefore);
		setDemoImgSRC2(objectAfter);
		setisSpellDragActive(true);
	};
	const handleRemoveBgHover = () => {
		setDemoImgSRC1(backgroundBefore);
		setDemoImgSRC2(backgroundAfter);
		setisSpellDragActive(true);
	};
	const autoCapHover = () => {
		setDemoImgSRC1(original);
		setDemoImgSRC2(autoCap);
		setisSpellDragActive(true);
	};

	const handleMouseLeave = () => {
		setDemoImgSRC1(original);
		setDemoImgSRC2(original);
		setisSpellDragActive(false);
	};

	return (
		<div className='SpellsPanel'>
			<div className='SpellsMenu'>
				<div
					className='SpellContainer'
					id='inpaint-btn'
					draggable='true'
					onDragStart={() => {
						props.setIsInpainting(true);
					}}
					onDragEnd={() => {
						props.setIsInpainting(false);
						handleMouseLeave();
					}}
				>
					{/* <div className='SpellContainer'> */}
					<Tooltip
						title='Drag and drop on movie to remove object'
						placement='bottom'
					>
						<div
							className='SpellBox'
							onMouseEnter={handleRemoveObjectHover}
							onMouseLeave={handleMouseLeave}
						>
							<i className='fa-solid fa-wand-magic-sparkles'></i>
							<div className='toolTitle'>Magic remove object</div>
						</div>
					</Tooltip>
				</div>
				<div
					className='SpellContainer'
					id='removeBG-btn'
					draggable='true'
					onDragStart={() => {
						props.setIsRemovingBG(true);
					}}
					onDragEnd={() => {
						props.setIsRemovingBG(false);
						handleMouseLeave();
					}}
				>
					{/* <div className='SpellContainer'> */}
					<Tooltip
						title='Drag and drop on movie to remove background'
						placement='bottom'
					>
						<div
							className='SpellBox'
							onMouseEnter={handleRemoveBgHover}
							onMouseLeave={handleMouseLeave}
						>
							<i className='fa-solid fa-wand-magic-sparkles'></i>
							<div className='toolTitle'>Magic remove background</div>
						</div>
					</Tooltip>
				</div>
				<div
					className='SpellContainer'
					id='autocap-btn'
					draggable='true'
					onDragStart={() => {
						props.setisAutoCap(true);
						props.setIsRemovingBG(false);
						props.setIsInpainting(false);
					}}
					onDragEnd={() => {
						props.setisAutoCap(false);
						handleMouseLeave();
					}}
				>
					<Tooltip
						title='Drag and drop on movie to create caption automatically'
						placement='bottom'
					>
						<div
							className='SpellBox'
							onMouseEnter={autoCapHover}
							onMouseLeave={handleMouseLeave}
						>
							<i className='fa-solid fa-wand-magic-sparkles'></i>
							<div className='toolTitle'>Magic caption</div>
						</div>
					</Tooltip>
				</div>
			</div>
			<div className='demoImgContainer'>
				<div className='dic'>
					<div>Before</div>
					<img className='demoImg' src={demoImgSRC1}></img>
				</div>
				<div className='dic'>
					<div>After</div>
					<img className='demoImg2' src={demoImgSRC2}></img>
				</div>
			</div>
		</div>
	);
}

export default Spells;
