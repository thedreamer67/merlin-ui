import React from 'react';
import Wpnavbar from './Wpnavbar';

function WorkingPanel(props) {
	return (
		<Wpnavbar
			isMagicActionActive={props.isMagicActionActive}
			setIsMagicActionActive={props.setIsMagicActionActive}
			setisSpellDragActive={props.setisSpellDragActive}
			setIsInpainting={props.setIsInpainting}
			setIsRemovingBG={props.setIsRemovingBG}
			setisAutoCap={props.setisAutoCap}
			setcaptionclick={props.setcaptionclick}
			captionclick={props.captionclick}
			spellsclick={props.spellsclick}
			setSpellsClick={props.setSpellsClick}
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
			maxFrames={props.maxFrames}
		/>
	);
}

export default WorkingPanel;
