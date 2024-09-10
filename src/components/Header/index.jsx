import { Link } from 'react-router-dom';
import { useState } from 'react';
import './styles.css'
import { useEffect } from 'react';
import logo from "../../assets/images/logo.png";
<source />;

export default function Header() {

    function logOut() {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    return (
        <div className='header-container'>
            <header>
                <Link to="/"><img src={logo} alt="Logo" className="header-logo" />
                </Link>
                <nav className="menu">
                    <ul>
                        <Link to="/">
                            <li>HOME</li>
                        </Link>
                        <Link to="/americanBobtails">
                            <li>AMERICAN BOBTAILS</li>
                        </Link>
                        <Link to="/abyssinian">
                            <li>ABYSSINIAN</li>
                        </Link>
                        <Link to="/americanWirehair">
                            <li>AEGEAN </li>
                        </Link>
                        <Link to="/americanCurly">
                            <li>AMERICAN-CURLY</li>
                        </Link>
                        <Link to="/americanShortHair">
                            <li>AMERICAN-SHORT-HAIR</li>
                        </Link>
                        <Link to="/breedNotListed">
                            <li>RAÇAS NÃO LISTADAS</li>
                        </Link>
                        <Link className='user-button' to="/login"
                            onClick={logOut}><li>SAIR</li>
                        </Link >
                    </ul>
                </nav>
            </header>
        </div>
    )
}