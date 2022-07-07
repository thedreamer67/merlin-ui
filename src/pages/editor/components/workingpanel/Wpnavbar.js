import React, { useState } from "react";
import "./styles/Wpnavbar.css";
import Library from "./Library";
import AutoCaption from "./AutoCaption";

function Wpnavbar() {
  const [libraryclick, setlibraryclick] = useState(false);
  const [captionclick, setcaptionclick] = useState(false);
  const handleLibraryClick = () => {
    setlibraryclick(!libraryclick);
    setcaptionclick(false);
  };
  const handleCaptionClick = () => {
    setcaptionclick(!captionclick);
    setlibraryclick(false);
  };

  return (
    <React.Fragment>
      <nav className="wpnavbar">
        <div className="wpnav-menu">
          <div className="wpnav-item">
            <div className="wpbtn" onClick={handleLibraryClick}>
              Library
            </div>
          </div>
          <div className="wpnav-item">
            <div className="wpbtn" onClick={handleCaptionClick}>
              Auto Caption
            </div>
          </div>
        </div>
      </nav>
      {libraryclick ? <Library /> : null}
      {captionclick ? <AutoCaption /> : null}
    </React.Fragment>
  );
}

export default Wpnavbar;
