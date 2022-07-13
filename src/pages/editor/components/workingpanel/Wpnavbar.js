import React, { useState, useEffect } from "react";
import "./styles/Wpnavbar.css";
import Library from "./library/Library";
import AutoCaption from "./autocaption/AutoCaption";
import MagicAction from "./MagicAction";
import Spells from "./Spells";

function Wpnavbar(props) {
  const { isMagicActionActive } = props;
  const { setIsMagicActionActive } = props;
  const [libraryclick, setlibraryclick] = useState(false);
  const [captionclick, setcaptionclick] = useState(false);
  const [spellsclick, setSpellsClick] = useState(false);
  const handleLibraryClick = () => {
    setlibraryclick(!libraryclick);
    setcaptionclick(false);
    setIsMagicActionActive(false);
    setSpellsClick(false);
  };
  const handleCaptionClick = () => {
    setcaptionclick(!captionclick);
    setlibraryclick(false);
    setIsMagicActionActive(false);
    setSpellsClick(false);
  };
  const handleSpellsClick = () => {
    setSpellsClick(!spellsclick);
    setcaptionclick(false);
    setlibraryclick(false);
    setIsMagicActionActive(false);
  };
  useEffect(() => {
    if (isMagicActionActive) {
      setlibraryclick(false);
      setcaptionclick(false);
      setSpellsClick(false);
    }
  }, [isMagicActionActive]);

  // useEffect(() => {
  //   if (libraryclick){
  //     setIsMagicActionActive(false);
  //     setcaptionclick(false);
  //   }
  // }, [libraryclick]);

  // useEffect(() => {
  //   if (captionclick){
  //     setIsMagicActionActive(false);
  //     setlibraryclick(false);
  //   }
  // }, [captionclick]);

  return (
    <React.Fragment>
      <nav className="wpnavbar">
        <div className="wpnav-menu">
          <div className="wpnav-item">
            <div
              onClick={handleLibraryClick}
              style={{
                backgroundColor: libraryclick ? "purple" : "transparent",
              }}
            >
              <div className="wpbtn">Library</div>
            </div>
          </div>
          <div className="wpnav-item">
            <div
              onClick={handleCaptionClick}
              style={{
                backgroundColor: captionclick ? "purple" : "transparent",
              }}
            >
              <div className="wpbtn">Auto Caption</div>
            </div>
          </div>
          <div className="wpnav-item">
            <div
              onClick={handleSpellsClick}
              style={{
                backgroundColor: captionclick ? "purple" : "transparent",
              }}
            >
              <div className="wpbtn">Spells</div>
            </div>
          </div>
        </div>
      </nav>
      {libraryclick ? <Library /> : null}
      {spellsclick ? <Spells /> : null}
      {captionclick ? <AutoCaption /> : null}
      {isMagicActionActive ? <MagicAction /> : null}
    </React.Fragment>
  );
}

export default Wpnavbar;
