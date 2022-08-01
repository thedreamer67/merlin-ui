import React, { useState, useEffect } from 'react';
import EditableLabel from './EditableLabel';
// import { convertToSRTFormat } from './subtitles';
import './styles/AutoCaption.css';

function AutoCaption(props) {
	const [isAdded, setIsAdded] = useState(false);

	const axios = require('axios');
	const baseURL = 'http://127.0.0.1:8000';
	const captionURL = `${baseURL}/captions`;

	// Parser for captions
	const PF_SRT = (() => {
		const pattern =
			/(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|=\n{2}))/gm;

		const toLineObj = (group) => {
			return {
				line: group[1],
				startTime: group[2],
				endTime: group[3],
				text: group[4],
			};
		};

		const parse = (f) => {
			if (typeof f != 'string') alert('Sorry, Parser accept string only.');

			let result = [];
			let matches = 0;

			if (f == null) return {};

			f = f.replace(/\r\n|\r|\n/g, '\n');

			while ((matches = pattern.exec(f)) != null) {
				result.push(toLineObj(matches));
			}
			return result;
		};

		return {
			parse: parse,
		};
	})();

	const convertToSRTFormat = (subtitles) => {
		let output = '';
		for (let i = 0; i < subtitles.length; i++) {
			const obj = subtitles[i];
			output += obj.line;
			output += '\n';
			output += obj.startTime + ' --> ' + obj.endTime;
			output += '\n';
			output += obj.text;
			output += '\n\n';
		}
		console.log(output);
		return output;
	};

	// async function getCaption() {
	// 	const captionFile = await axios
	// 		.get(captionURL)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			return PF_SRT.parse(res.data);
	// 		})
	// 		.catch((err) => console.log(err));
	// 	return captionFile;
	// }

	const editSubtitles = (id, text) => {
		const copied_subtitle_parsed = JSON.parse(JSON.stringify(props.subtitles));
		copied_subtitle_parsed[id].text = text;
	};

	const updateCaption = async () => {
		console.log('Putting the following files...');
		const captionToUpdate = convertToSRTFormat(props.subtitles);
		const updateCaptionRes = await axios
			.put(`${captionURL}?updated_captions=${captionToUpdate}`)
			.then((res) => {
				console.log('caption updated!');
				console.log(res.status);
				return res.status;
			})
			.catch((err) => console.log(err));
		if (updateCaptionRes === 200) {
			// const captionRetrieved = await getCaption();
		}
	};

	const saveSubtitles = () => {
		const copied_subtitle_parsed = JSON.parse(JSON.stringify(props.subtitles));
		props.setSubtitles([...copied_subtitle_parsed]);
		alert('Subtitles edits saved!');
	};

	useEffect(() => {
		console.log(props.subtitles);
		updateCaption();
		convertToSRTFormat(props.subtitles);
	}, [props.subtitles]);

	// let copied_subtitle_parsed = JSON.parse(JSON.stringify(props.subtitles));

	const handleAdd = () => {
		setIsAdded(!isAdded);
		props.setIsFinal(!props.isFinal);
		if (!isAdded) {
			alert('Subtitles added to video!');
		} else {
			alert('Subtitles removed from video!');
		}
	};

	return (
		<div>
			<div className='buttonrow'>
				<button className='autocaptionbtn' onClick={saveSubtitles}>
					Save
				</button>
				{isAdded ? (
					<button className='autocaptionbtn' onClick={handleAdd}>
						Remove from movie
					</button>
				) : (
					<button onClick={handleAdd} className='autocaptionbtn'>
						Add to movie
					</button>
				)}
			</div>
			<div className='subtitles'>
				{props.subtitles.map((obj, index) => (
					<div className='subtitlesrow'>
						<p className='time'>{obj.startTime.split(',')[0]}</p>
						<EditableLabel
							id={index}
							text={obj.text}
							editSubtitles={editSubtitles}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default AutoCaption;
