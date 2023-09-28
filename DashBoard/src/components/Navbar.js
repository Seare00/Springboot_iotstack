import menu from '../assets/menu-button.png'
import github from '../assets/github.png'
import React, { useState } from 'react'

const Navbar = ({ parallaxRef }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };
  
    return (
      <nav className={`navbar ${dropdownVisible ? 'show-dropdown' : ''}`}>
        <div className="menu-icon" onClick={toggleDropdown}>
          <img src={menu} alt="Menu" style={{ width: '50px', height: '50px'}} />
        </div>
        {dropdownVisible && (
          <ul className="dropdown-menu">
            <li className="list-item" onClick={() => {parallaxRef.current.scrollTo(1); setDropdownVisible(false)}}>Uppsala</li>
            <li className="list-item" onClick={() => {parallaxRef.current.scrollTo(2); setDropdownVisible(false)}}>Stockholm E</li>
            <li className="list-item" onClick={() => {parallaxRef.current.scrollTo(3); setDropdownVisible(false)}}>Stockholm W</li>
          </ul>
        )}
        <div className="right-menu">
          <a href="https://github.com/Kkabylion/Gruppuppgift" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="Github" style={{ width: '30px', height: '30px'}} />
          </a>
        </div>
      </nav>
    );
};

export default Navbar