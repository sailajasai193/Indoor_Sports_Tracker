import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../Styles/Header.css';
import logo from './images/image.png';
import { FaBars } from 'react-icons/fa';

function Header() {
  const [menuToggle, setMenuToggle] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  const [loginRole, setLoginRole] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      // You can add logic here if you want to handle responsive menu differently
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeMenu = () => {
    setMenuToggle(false);
  };

  const handleLoginClick = (role) => {
    setLoginRole(role);
    setShowPopup(true);
  };

  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    setIsAuthenticated(true);
    setShowPopup(false);

    if (loginRole === 'student') {
      navigate('/options');
    } else {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    googleLogout();
    setIsAuthenticated(false);
    setUser(null);
    setLoginRole(null);
    navigate('/');
  };

  return (
    <div className="header">
      <div className="logo-nav-new">
        <div className="logo">
          <a href="https://iitdh.ac.in">
            <img src={logo} alt="iitdh logo" />
          </a>
        </div>
        <Link to="/" onClick={closeMenu} className="header-title">
               <h1>Indoor Sports Occupancy Tracker</h1>
        </Link>

      </div>

      {!isAuthenticated && (
        <div className="login-buttons">
          <button onClick={() => handleLoginClick('student')} className="student-button">Student Login</button>
          <button onClick={() => handleLoginClick('admin')} className="admin-button">Admin Login</button>
        </div>
      )}

      <div className='nav-right'>
        <div className="mobile-menu" onClick={() => setMenuToggle(!menuToggle)}>
          <FaBars className="menu-icon" />
        </div>
        <ul className={menuToggle ? 'nav-options active' : 'nav-options'}>
          <li className="option" onClick={closeMenu}>
            {isAuthenticated ? (
              <>
                <span className="hi-username">Hi, {user.given_name}</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </>
            ) : null}
          </li>
        </ul>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Login as {loginRole}</h3>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log('Login Failed')}
              useOneTap={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
