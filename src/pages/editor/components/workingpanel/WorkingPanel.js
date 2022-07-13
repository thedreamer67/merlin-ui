import React from "react";
import Wpnavbar from "./Wpnavbar";

function WorkingPanel(props) {
  const { isMagicActionActive } = props;
  const { setIsMagicActionActive } = props;
  const { setisSpellDragActive } = props;
  return (
    <Wpnavbar
      isMagicActionActive={isMagicActionActive}
      setIsMagicActionActive={setIsMagicActionActive}
      setisSpellDragActive={setisSpellDragActive}
    />
  );
}

export default WorkingPanel;
