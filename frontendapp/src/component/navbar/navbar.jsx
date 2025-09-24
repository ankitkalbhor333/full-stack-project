import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import { assets } from '../../assets/asset.js';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('');
  const { getTotalCartamount, token, setToken } = useContext(StoreContext);
  const location = useLocation(); // For active link detection

  const handleMenuClick = (name) => setMenu(name);
const navigate =useNavigate();
  const Logout = () => {
    setToken(null); // clear token
    localStorage.removeItem("token"); // optional: remove from storage
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Middle: Menu */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => handleMenuClick('home')}
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/appdownload">App Download</Link>
        </li>
        <li className="contact">
          <Link to="/contact">Contact Us</Link>
        </li>
        
      </ul>

      {/* Right: Icons + Sign In/Profile */}
      <div className="navbar-right">
        <Link to="/searchfood">
          <img src={assets.searchicon} alt="Search" className="icon" />
        </Link>

        <div className="navbar-cart">
          <Link to="/cart">
            <img src={assets.basket} alt="Cart" className="icon" />
          </Link>
          {getTotalCartamount() > 0 && <span className="cart-dot"></span>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)} className="signin-btn">
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <div className='profile-icon'>
              <img src={assets.profile_image} alt="Profile" />
            </div>
            <ul className="nav-profile-dropdown">
              <li className="profile-link">
          <Link to="/profile">My Profile</Link>
        </li>
              <li onClick={()=>navigate('/myorders')}>
                <img  src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={Logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
              
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
