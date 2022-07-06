import React, { useState } from "react";
import "./styles/FrameTools.css";


function FrameTools(props) {

  return (
    <>
      <nav className="frametoolsbar">
        <div className="uppertoolbar">
            <div className="actionContainer">
                <div className="actionTitle">Crop</div>
                <div className="actionTitle">Duplicate</div>
                <div className="actionTitle">Split</div>
                <div className="actionTitle">Delete</div>
            </div>
        </div>
        <div className="lowertoolbar">
            <div className="icon-container">
                <i class="fa-solid fa-scissors"></i>
                <div className="iconTitle">Actions</div>
            </div>
            <div className="icon-container">
                <i class="fa-solid fa-gauge"></i>
                <div className="iconTitle">Speed</div>
            </div>
            <div className="icon-container">
                <i class="fa-solid fa-volume-high"></i>
                <div className="iconTitle">Volume</div>
            </div>
            <div className="icon-container">
                <i class="fa-solid fa-compact-disc"></i>
                <div className="iconTitle">Filters</div>
            </div>
            <div className="icon-container">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <div className="iconTitle">Magic</div>
            </div>
        </div>
            
      </nav>
    </>
  );
}

export default FrameTools;