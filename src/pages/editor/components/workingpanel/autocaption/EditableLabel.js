import React, { useState } from "react";

function EditableLabel(props) {
  const { id, text, editSubtitles } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const exitInput = () => {
    setIsEditing(false);
    editSubtitles(id, value);
  };

  return (
    <div>
      {!isEditing ? (
        <label onClick={() => setIsEditing(true)}>{value}</label>
      ) : (
        <input
          id={id}
          onBlur={exitInput}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
      )}
    </div>
  );
}

export default EditableLabel;
