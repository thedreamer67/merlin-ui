import React from 'react';
import Wpnavbar from './Wpnavbar';

function WorkingPanel(props) {
	const { setisSpellDragActive } = props;
	const { isMagicActionActive, setIsMagicActionActive } = props;
	return (
		<Wpnavbar
			isMagicActionActive={isMagicActionActive}
			setIsMagicActionActive={setIsMagicActionActive}
			setisSpellDragActive={setisSpellDragActive}
			setIsInpainting={props.setIsInpainting}
			setIsRemovingBG={props.setIsRemovingBG}
			setIsDraggingVid={props.setIsDraggingVid}
			setDraggingVidID={props.setDraggingVidID}
			fetchProject={props.fetchProject}
		/>
	);
}

export default WorkingPanel;
