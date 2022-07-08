import React from "react";
import Wpnavbar from "./Wpnavbar";

function WorkingPanel(props) {
  const { isMagicActionActive } = props;
  const { setIsMagicActionActive } = props;
  return (
    <Wpnavbar
      isMagicActionActive={isMagicActionActive}
      setIsMagicActionActive={setIsMagicActionActive}
    />
  );
}

export default WorkingPanel;
