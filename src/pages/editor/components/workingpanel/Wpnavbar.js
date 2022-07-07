import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './styles/Wpnavbar.css';

import Library from './Library';
import AutoCaption from './AutoCaption';
import MagicAction from './MagicAction';
import Search from './Search';

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

	const SearchBar = () => {
		return (
			<Box sx={{ '& > :not(style)': { m: 1 } }}>
				<FormControl variant='standard'>
					<InputLabel htmlFor='input-with-icon-adornment'>
						With a start adornment
					</InputLabel>
					<Input
						id='input-with-icon-adornment'
						startAdornment={
							<InputAdornment position='start'>
								<AccountCircle />
							</InputAdornment>
						}
					/>
				</FormControl>
				<TextField
					id='input-with-icon-textfield'
					label='TextField'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<AccountCircle />
							</InputAdornment>
						),
					}}
					variant='standard'
				/>
				<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
					<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField id='input-with-sx' label='With sx' variant='standard' />
				</Box>
			</Box>
		);
	};

	return (
		<React.Fragment>
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
					<div>
						<form onSubmit={handleSearchSubmit}>
							<input
								className='searchBar'
								placeholder='Enter search here'
								onChange={(e) => {
									setSearchQuery(e.target.value);
								}}
							></input>
						</form>
					</div>
				</div>
			</nav>
			{libraryclick ? <Library /> : null}
			{captionclick ? <AutoCaption /> : null}
			{isMagicActionActive ? <MagicAction /> : null}
			{isSearching ? <Search query={searchQuery} /> : null}
		</React.Fragment>
	);
}

export default Wpnavbar;
