import React, { useState, useEffect } from 'react';
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
