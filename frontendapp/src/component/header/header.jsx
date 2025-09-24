
import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <h1>“Delicious. Affordable. At your doorstep.”</h1>
        <p>Easy to order food at Home</p>
        <hr />
        <Link to="/menu" className="menu-button">Menu</Link>
      </div>
    </div>
  )
}

export default Header;
