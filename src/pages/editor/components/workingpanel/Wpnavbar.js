import React, { useState, useEffect } from 'react';
import './styles/Wpnavbar.css';
import Library from './library/Library';
import AutoCaption from './autocaption/AutoCaption';
import MagicAction from './MagicAction';
import Spells from './Spells';
// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import { createTheme } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import './styles/Wpnavbar.css';
import Search from './Search';
import { ThemeProvider } from '@emotion/react';
import { borderRadius } from '@mui/system';

function Wpnavbar(props) {
	const { isMagicActionActive, setIsMagicActionActive } = props;
	const [libraryclick, setlibraryclick] = useState(false);
	const { captionclick, setcaptionclick } = props;
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const { spellsclick, setSpellsClick } = props;
	const { setisSpellDragActive } = props;
	const [heatmap, setHeatmap] = useState('');
	const [probability, setProbability] = useState('');

	const axios = require('axios');
	const baseURL = 'http://127.0.0.1:8000';

	const handleLibraryClick = () => {
		setlibraryclick(!libraryclick);
		setcaptionclick(false);
		setIsMagicActionActive(false);
		setIsSearching(false);
		setSpellsClick(false);
	};
	const handleCaptionClick = () => {
		setcaptionclick(!captionclick);
		setlibraryclick(false);
		setIsMagicActionActive(false);
		setIsSearching(false);
		setSpellsClick(false);
	};

	const handleSpellsClick = () => {
		setSpellsClick(!spellsclick);
		setcaptionclick(false);
		setlibraryclick(false);
		setIsMagicActionActive(false);
		setIsSearching(false);
	};

	useEffect(() => {
		if (isMagicActionActive) {
			setlibraryclick(false);
			setcaptionclick(false);
			setIsSearching(false);
			setSpellsClick(false);
		}
	}, [isMagicActionActive]);

	async function getVideoID() {
		const project = await props.fetchProject();
		// console.log(project)
		const timelinevideo_ids = project.timelinevideo_ids[0];
		// console.log(timelinevideo_ids)
		const videoidURL = `${baseURL}/project/timelinevideo/${timelinevideo_ids}/details`;
		const videoid = await axios.get(videoidURL).then((res) => {
			// console.log(res.data);
			return JSON.parse(res.data).video_id;
		});
		return videoid;
	}

	async function querySearch() {
		const video_id = await getVideoID();
		const searchURL = `${baseURL}/video/${video_id}/search/${searchQuery}`;
		// console.log(searchURL)
		const payload = { video_id: video_id, search_query: searchQuery };
		const sendSearchQuery = await axios
			.post(searchURL, payload)
			.then((res) => {
				return res.status;
			})
			.catch((err) => console.log(err));
		console.log(sendSearchQuery);
		if (sendSearchQuery === 200) {
			const resheatmap = await getSearchHeatMap(video_id);
			setHeatmap(resheatmap);
			const resprobability = await getSearchProbability(video_id);
			setProbability(resprobability);
			setIsSearching(true);
		} else {
			alert('Search is unsuccessful.');
		}
	}

	async function getSearchHeatMap(video_id) {
		const heatmapURL = `${baseURL}/video/${video_id}/heatmap`;
		// console.log(heatmapURL)
		const resheatmap = await axios
			.get(heatmapURL, { responseType: 'arraybuffer' })
			.then((res) => {
				// console.log(res.status);
				// console.log(res.data)
				const base64 = btoa(
					new Uint8Array(res.data).reduce(
						(data, byte) => data + String.fromCharCode(byte),
						''
					)
				);
				return base64;
			})
			.catch((err) => console.log(err));
		return resheatmap;
	}

	async function getSearchProbability(video_id) {
		const probabilityURL = `${baseURL}/video/${video_id}/search_probabilities`;
		// console.log(probabilityURL)
		const resprobability = await axios
			.get(probabilityURL)
			.then((res) => {
				// console.log(res.status);
				// console.log(res.data)
				return JSON.parse(res.data);
			})
			.catch((err) => console.log(err));
		return resprobability;
	}

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		// console.log(e.target.value);
		setlibraryclick(false);
		setIsMagicActionActive(false);
		setcaptionclick(false);
		setSpellsClick(false);
		//pass in searchquery to search below
		querySearch();
		const searchInput = document.getElementById('searchInput');
		searchInput.value = '';
	};

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

	const handleDragStart = () => {};

	const handleDragEnd = () => {};

	return (
		<>
			<nav className='wpnavbar'>
				<div className='wpnav-menu'>
					<div className='leftMenu'>
						<div className='wpnav-item'>
							<div
								onClick={handleLibraryClick}
								style={{
									backgroundColor: libraryclick ? 'purple' : 'transparent',
								}}
							>
								<div className='wpbtn'>Library</div>
							</div>
						</div>
						{/* <div className='wpnav-item'>
							<div
								onClick={handleCaptionClick}
								style={{
									backgroundColor: captionclick ? 'purple' : 'transparent',
								}}
							>
								<div className='wpbtn'>Auto Caption</div>
							</div>
						</div> */}
						<div className='wpnav-item'>
							<div
								onClick={handleSpellsClick}
								style={{
									backgroundColor: spellsclick ? 'purple' : 'transparent',
								}}
							>
								<div className='wpbtn'>Spells</div>
							</div>
						</div>
					</div>
					<div className='searchBar'>
						<form
							onSubmit={handleSearchSubmit}
							style={{ height: '100%', width: '100%' }}
						>
							<input
								id='searchInput'
								className='searchInput'
								placeholder='Search video'
								onChange={(e) => {
									setSearchQuery(e.target.value);
								}}
							></input>
							{/* <SearchBar updateSearchQuery={setSearchQuery} /> */}
						</form>
					</div>
				</div>
			</nav>
			{libraryclick ? (
				<Library
					setIsDraggingVid={props.setIsDraggingVid}
					setDraggingVidID={props.setDraggingVidID}
					fetchProject={props.fetchProject}
				/>
			) : null}
			{spellsclick ? (
				<Spells
					setisSpellDragActive={setisSpellDragActive}
					setIsInpainting={props.setIsInpainting}
					setIsRemovingBG={props.setIsRemovingBG}
					setIsMagicActionActive={setIsMagicActionActive}
					setisAutoCap={props.setisAutoCap}
				/>
			) : null}
			{captionclick ? (
				<AutoCaption
					subtitles={props.subtitles}
					setSubtitles={props.setSubtitles}
					setIsFinal={props.setIsFinal}
					isFinal={props.isFinal}
				/>
			) : null}
			{isMagicActionActive ? (
				<MagicAction
					frameNum={props.frameNum}
					mainTimeline={props.mainTimeline}
					fetchProject={props.fetchProject}
					setIsMagicActionActive={setIsMagicActionActive}
					setSpellsClick={setSpellsClick}
					inpaint={props.inpaint}
					removeBG={props.removeBG}
					setTimelineVids={props.setTimelineVids}
					setVideoURL={props.setVideoURL}
				/>
			) : null}
			{isSearching ? (
				<Search
					query={searchQuery}
					heatmap={heatmap}
					probability={probability}
				/>
			) : null}
		</>
	);
}

export default Wpnavbar;
