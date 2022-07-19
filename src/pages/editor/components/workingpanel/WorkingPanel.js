import React from 'react';
import Wpnavbar from './Wpnavbar';

function WorkingPanel(props) {
	const { setisSpellDragActive } = props;
	const { isMagicActionActive, setIsMagicActionActive } = props;
	const { captionclick, setcaptionclick } = props;
	const { spellsclick, setSpellsClick } = props;
	const {subtitles, setSubtitles} = props

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
			subtitles={subtitles}
			setSubtitles={setSubtitles}
		/>
	);
}

export default WorkingPanel;
