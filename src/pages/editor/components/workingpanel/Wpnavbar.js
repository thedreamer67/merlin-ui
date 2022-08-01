import React, { useState, useEffect } from 'react';
import Library from './library/Library';
import AutoCaption from './autocaption/AutoCaption';
import MagicAction from './MagicAction';
import Spells from './Spells';
import Search from './Search';
import './styles/Wpnavbar.css';

function Wpnavbar(props) {
	const [libraryclick, setlibraryclick] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [heatmap, setHeatmap] = useState('');
	const [probability, setProbability] = useState('');

	const axios = require('axios');
	const baseURL = 'http://127.0.0.1:8000';

	const handleLibraryClick = () => {
		setlibraryclick(!libraryclick);
		props.setcaptionclick(false);
		props.setIsMagicActionActive(false);
		setIsSearching(false);
		props.setSpellsClick(false);
	};

	const handleSpellsClick = () => {
		props.setSpellsClick(!props.spellsclick);
		props.setcaptionclick(false);
		setlibraryclick(false);
		props.setIsMagicActionActive(false);
		setIsSearching(false);
	};

	useEffect(() => {
		if (props.isMagicActionActive) {
			setlibraryclick(false);
			props.setcaptionclick(false);
			setIsSearching(false);
			props.setSpellsClick(false);
		}
	}, [props.isMagicActionActive]);

	const getVideoID = async () => {
		const project = await props.fetchProject();
		const timelinevideo_ids = project.timelinevideo_ids[0];
		const videoidURL = `${baseURL}/project/timelinevideo/${timelinevideo_ids}/details`;
		const videoid = await axios.get(videoidURL).then((res) => {
			return JSON.parse(res.data).video_id;
		});
		return videoid;
	};

	const getSearchHeatMap = async (video_id) => {
		const heatmapURL = `${baseURL}/video/${video_id}/heatmap`;
		const resheatmap = await axios
			.get(heatmapURL, { responseType: 'arraybuffer' })
			.then((res) => {
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
	};

	const getSearchProbability = async (video_id) => {
		const probabilityURL = `${baseURL}/video/${video_id}/search_probabilities`;
		const resprobability = await axios
			.get(probabilityURL)
			.then((res) => {
				return JSON.parse(res.data);
			})
			.catch((err) => console.log(err));
		return resprobability;
	};

	const querySearch = async () => {
		const video_id = await getVideoID();
		const searchURL = `${baseURL}/video/${video_id}/search/${searchQuery}`;
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
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setlibraryclick(false);
		props.setIsMagicActionActive(false);
		props.setcaptionclick(false);
		props.setSpellsClick(false);
		querySearch();
		const searchInput = document.getElementById('searchInput');
		searchInput.value = '';
	};

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
						<div className='wpnav-item'>
							<div
								onClick={handleSpellsClick}
								style={{
									backgroundColor: props.spellsclick ? 'purple' : 'transparent',
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
								autoComplete='off'
								onChange={(e) => {
									setSearchQuery(e.target.value);
								}}
							></input>
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
			{props.spellsclick ? (
				<Spells
					setisSpellDragActive={props.setisSpellDragActive}
					setIsInpainting={props.setIsInpainting}
					setIsRemovingBG={props.setIsRemovingBG}
					setIsMagicActionActive={props.setIsMagicActionActive}
					setisAutoCap={props.setisAutoCap}
				/>
			) : null}
			{props.captionclick ? (
				<AutoCaption
					subtitles={props.subtitles}
					setSubtitles={props.setSubtitles}
					setIsFinal={props.setIsFinal}
					isFinal={props.isFinal}
				/>
			) : null}
			{props.isMagicActionActive ? (
				<MagicAction
					frameNum={props.frameNum}
					mainTimeline={props.mainTimeline}
					fetchProject={props.fetchProject}
					setIsMagicActionActive={props.setIsMagicActionActive}
					setSpellsClick={props.setSpellsClick}
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
					fetchProject={props.fetchProject}
					maxFrames={props.maxFrames}
				/>
			) : null}
		</>
	);
}

export default Wpnavbar;
