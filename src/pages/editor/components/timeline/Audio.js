import React from 'react';
import './styles/Audio.css';

function Audio(props) {
	return (
		<section className='AudioContainer'>
			<div className='firstPad'></div>
			<div
				style={(function () {
					const timeline = document.getElementById('timeline');
					const scrollBarWidth = timeline.offsetWidth - timeline.clientWidth;
					const width =
						props.width -
						timeline.offsetWidth / 2 -
						(timeline.offsetWidth / 2 - scrollBarWidth);
					return {
						minWidth: width + 'px',
						backgroundImage:
							'radial-gradient(ellipse at center, #EEFF7F, #11A011',
						fontSize: '13px',
					};
				})()}
			>
				Audio.mp3
			</div>
			<div
				style={(function () {
					const timeline = document.getElementById('timeline');
					const scrollBarWidth = timeline.offsetWidth - timeline.clientWidth;
					let lastWidth =
						((timeline.offsetWidth / 2 - scrollBarWidth) /
							timeline.offsetWidth) *
						100;
					return { minWidth: lastWidth + 'vw' };
				})()}
			></div>
		</section>
	);
}

export default Audio;
