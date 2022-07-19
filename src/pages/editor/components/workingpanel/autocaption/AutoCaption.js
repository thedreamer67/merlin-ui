import React, { useState, useEffect } from "react";
import "./styles/AutoCaption.css";
// import EditableLabel from "react-inline-editing";
import EditableLabel from "./EditableLabel";
import PF_SRT, { convertToSRTFormat } from "./subtitles";

function AutoCaption(props) {
  const axios = require('axios');
  const baseURL = 'http://127.0.0.1:8000';
  const captionURL = `${baseURL}/captions`;

  const {subtitles, setSubtitles} = props
  const [showSubtitles, setShowSubtitles] = useState(true)

  async function getCaption() {
    const captionFile = await axios
    .get(captionURL)
    .then((res) => {
      console.log(res.data)
      return (PF_SRT.parse(res.data));
    })
    .catch((err) => console.log(err));
    return captionFile
  }

  const [generateSubtitlesClicked, setGenerateSubtitlesClicked] =
    useState(true);

  const handleGenerateSubtitles = () => {
    setGenerateSubtitlesClicked(!generateSubtitlesClicked);
  };

  const editSubtitles = (id, text) => {
    copied_subtitle_parsed[id].text = text;
  };

  async function updateCaption() {
    console.log('Putting the following files...')
    const captionToUpdate = convertToSRTFormat(subtitles)
    const updateCaptionRes = await axios
    .put(`${captionURL}?updated_captions=${captionToUpdate}`)
    .then((res) => {
      console.log('caption updated!')
      console.log(res.status)
      return (res.status);
    })
    .catch((err) => console.log(err));
    if (updateCaptionRes === 200){
      const captionRetrieved = await getCaption()
      // console.log(subtitles)
      // alert('Subtitles saved!')
    }
  }


  const saveSubtitles = () => {
    setSubtitles([...copied_subtitle_parsed]);
    alert('Subtitles edits saved!')
  };

  const toggleShowSubtitles = () => {
    if (showSubtitles) {
      // export with subtitles
    } else {
      // export without subtitles
    }
    console.log(showSubtitles)
    setShowSubtitles(!showSubtitles)
  }

  useEffect(() => {
    console.log(subtitles);
    updateCaption()
    convertToSRTFormat(subtitles);
  }, [subtitles]);

  let copied_subtitle_parsed = JSON.parse(JSON.stringify(subtitles));

  return (
    <div>
      {/* <div className="buttonrow"> */}
      {/* <button
        className={
          generateSubtitlesClicked
            ? "autocaptionbtn-selected"
            : "autocaptionbtn"
        }
        onClick={handleGenerateSubtitles}
      >
        Generate Caption
      </button> */}
      <button className="autocaptionbtn" onClick={saveSubtitles}>
        Save
      </button>
      <button className="autocaptionbtn" onClick={toggleShowSubtitles}>
        Toggle
      </button>
      {/* </div> */}
      {generateSubtitlesClicked ? (
        <div className="subtitles">
          {subtitles.map((obj, index) => (
            <div className="subtitlesrow">
              <p className="time">{obj.startTime.split(",")[0]}</p>
              <EditableLabel
                id={index}
                text={obj.text}
                editSubtitles={editSubtitles}
              />
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default AutoCaption;