import React from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";

import "./styles/MaskCanvas.css";

function MaskCanvas() {

  return (
    <div className="MaskCanvasContainer">
      <CanvasDraw
      />
    </div>
  );
}

export default MaskCanvas;