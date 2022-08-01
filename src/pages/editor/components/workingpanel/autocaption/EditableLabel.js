import React, { useState } from 'react';

function EditableLabel(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(props.text);

	const exitInput = () => {
		setIsEditing(false);
		props.editSubtitles(props.id, value);
	};

	return (
		<div>
			{!isEditing ? (
				<label onClick={() => setIsEditing(true)}>{value}</label>
			) : (
				<input
					id={props.id}
					onBlur={exitInput}
					type='text'
					autoComplete='off'
					value={value}
					onChange={(event) => setValue(event.target.value)}
				></input>
			)}
		</div>
	);
}

export default EditableLabel;
