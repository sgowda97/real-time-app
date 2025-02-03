import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ setIsAuth }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');

        setIsAuth(false);
        navigate('/login');
    };

    let linkText = '';
    let linkTo = '';
    let onClickHandler = null;

    if (isLoggedIn) {
        linkText = 'Log out';
        onClickHandler = handleLogout;
    } else {
        if (location.pathname === '/login' || location.pathname === '/') {
            linkText = 'Sign Up';
            linkTo = '/signup';
        } else {
            linkText = 'Log In';
            linkTo = '/login';
        }
    }

    return (
        <header className="header">
            <h1 className="header-title">RTA</h1>
            <nav>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="logout-btn">
                        {linkText}
                    </button>
                ) : (
                    <Link to={linkTo}>{linkText}</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
