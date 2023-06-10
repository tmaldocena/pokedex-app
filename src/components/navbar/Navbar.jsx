import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../App';
import { ReactComponent as Logo } from '../../assets/pokeball.svg';
import './Navbar.css';
import { Link, Outlet } from 'react-router-dom';

const Navbar = ({ prop }) => {
    const context = useContext(ThemeContext);
    
    const [theme, setTheme] = useState(context.theme);

    const handleClick = () => {
        setTheme((theme === 'dark' ? 'light' : 'dark'));
        context.theme = theme;
        context.toggleTheme();
    }


    return (
        <nav className='navbar'>
            <Link className='navbar-logo' to='/'>
                <Logo className='navbar-logo-img'/>
                <h1>Pokedex</h1>
            </Link>
            <div className='navbar-div'>
                <Link className='navbar-links' to='/'>Home</Link>
                <Link className='navbar-links' to='/browse'>Browse</Link>
                <Link className='navbar-links' to='/search'>Search</Link>
                <Link className='navbar-links' to='/memes'>Memes</Link>
            <label htmlFor='checkMode' className='darkMode'></label>
            <input type='checkbox' id='checkMode' onChange={handleClick}></input>
            </div>
            <Outlet />
        </nav>
    );
}

export default Navbar;
