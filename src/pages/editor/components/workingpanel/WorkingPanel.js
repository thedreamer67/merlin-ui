import React, { useEffect } from 'react';
import Wpnavbar from './Wpnavbar';

function WorkingPanel(props) {
	const { setisSpellDragActive } = props;
	const { isMagicActionActive, setIsMagicActionActive } = props;
	const { captionclick, setcaptionclick } = props;
	const { spellsclick, setSpellsClick } = props;

	return (
		<Wpnavbar
			isMagicActionActive={isMagicActionActive}
			setIsMagicActionActive={setIsMagicActionActive}
			setisSpellDragActive={setisSpellDragActive}
			setIsInpainting={props.setIsInpainting}
			setIsRemovingBG={props.setIsRemovingBG}
			setisAutoCap={props.setisAutoCap}
			setcaptionclick={setcaptionclick}
			captionclick={captionclick}
			spellsclick={spellsclick}
			setSpellsClick={setSpellsClick}
			setIsDraggingVid={props.setIsDraggingVid}
			setDraggingVidID={props.setDraggingVidID}
			fetchProject={props.fetchProject}
			frameNum={props.frameNum}
			mainTimeline={props.mainTimeline}
			inpaint={props.inpaint}
			removeBG={props.removeBG}
			setTimelineVids={props.setTimelineVids}
			subtitles={props.subtitles}
			setSubtitles={props.setSubtitles}
			setVideoURL={props.setVideoURL}
			setIsFinal={props.setIsFinal}
			isFinal={props.isFinal}
		/>
	);
}

export default WorkingPanel;
