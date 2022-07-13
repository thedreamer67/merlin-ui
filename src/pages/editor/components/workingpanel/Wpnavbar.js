import React, { useState, useEffect } from 'react';

// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import { createTheme } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import './styles/Wpnavbar.css';

import Library from './library/Library';
import AutoCaption from './autocaption/AutoCaption';
import MagicAction from './MagicAction';
import Search from './Search';
import { ThemeProvider } from '@emotion/react';
import { borderRadius } from '@mui/system';

function Wpnavbar(props) {
	const { isMagicActionActive, setIsMagicActionActive } = props;
	const [libraryclick, setlibraryclick] = useState(false);
	const [captionclick, setcaptionclick] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const handleLibraryClick = () => {
		setlibraryclick(!libraryclick);
		setcaptionclick(false);
		setIsMagicActionActive(false);
		setIsSearching(false);
	};
	const handleCaptionClick = () => {
		setcaptionclick(!captionclick);
		setlibraryclick(false);
		setIsMagicActionActive(false);
		setIsSearching(false);
	};

	useEffect(() => {
		if (isMagicActionActive) {
			setlibraryclick(false);
			setcaptionclick(false);
			setIsSearching(false);
		}
	}, [isMagicActionActive]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		console.log(e.target.value);
		setIsSearching(true);
		setlibraryclick(false);
		setIsMagicActionActive(false);
		setcaptionclick(false);

		//pass in searchquery to search below
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
						<div className='wpnav-item'>
							<div
								onClick={handleCaptionClick}
								style={{
									backgroundColor: captionclick ? 'purple' : 'transparent',
								}}
							>
								<div className='wpbtn'>Auto Caption</div>
							</div>
						</div>
					</div>
					<div className='searchBar'>
						<form
							onSubmit={handleSearchSubmit}
							style={{ height: '100%', width: '100%' }}
						>
							<input
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
			{libraryclick ? <Library /> : null}
			{captionclick ? <AutoCaption /> : null}
			{isMagicActionActive ? <MagicAction /> : null}
			{isSearching ? <Search query={searchQuery} /> : null}
			<div
				style={{
					padding: '1vw 1vh',
				}}
			>
				<i
					className='fa-solid fa-wand-magic-sparkles'
					id='inpaint-btn'
					draggable='true'
					onDragStart={() => {
						props.setIsInpainting(true);
						document.getElementById('video-player').style.border =
							'4px solid purple';
						document.getElementById('video-player').style.borderRadius = '7px';
						document.getElementById('video-player').style.boxShadow =
							'0 0 10px purple';
						document.getElementById('video-player').style.outline = '';
					}}
					onDragEnd={() => {
						props.setIsInpainting(false);
						document.getElementById('video-player').style.border = '';
						document.getElementById('video-player').style.borderRadius = '';
						document.getElementById('video-player').style.boxShadow = '';
					}}
				></i>
				<i
					className='fa-solid fa-rectangle-xmark'
					id='removeBG-btn'
					draggable='true'
					onDragStart={() => {
						props.setIsRemovingBG(true);
						document.getElementById('video-player').style.border =
							'4px solid purple';
						document.getElementById('video-player').style.borderRadius = '7px';
						document.getElementById('video-player').style.boxShadow =
							'0 0 10px purple';
						document.getElementById('video-player').style.outline = '';
					}}
					onDragEnd={() => {
						props.setIsRemovingBG(false);
						document.getElementById('video-player').style.border = '';
						document.getElementById('video-player').style.borderRadius = '';
						document.getElementById('video-player').style.boxShadow = '';
					}}
				></i>
			</div>
		</>
	);
}

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#e3f2fd',
//     },
//   },
// });

// const SearchBar = (props) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'flex-end',
//           color: '#e3f2fd',
//           maxHeight: '100%',
//         }}
//         autoComplete='off'>
//         <i
//           className='fa-solid fa-magnifying-glass'
//           style={{ paddingRight: '0.5vw' }}></i>
//         <TextField
//           id='filled-basic'
//           label='Search video'
//           variant='outlined'
//           color='primary'
//           sx={{ input: { color: 'white' } }}
//           onChange={(e) => {
//             props.updateSearchQuery(e.target.value);
//           }}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// };

export default Wpnavbar;
