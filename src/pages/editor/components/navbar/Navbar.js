import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import Dropdown from "./Dropdown";

function Navbar(props) {
  const { handleStart } = props;
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left-menu">File</div>
        <div className="navbar-center-title">MERLIN</div>
        <div className= "navbar-right-menu">
          <div className="nav-item">
            <i className={click ? "fa-solid fa-circle-question" : "fa-regular fa-circle-question"} onClick={() => handleClick()} />
          </div>
          <div className="nav-item">
            <i class="fa-regular fa-circle-xmark" onClick={handleStart}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

//https://github.com/briancodex/react-navbar-dropdown/blob/master/src/components/Navbar.js
