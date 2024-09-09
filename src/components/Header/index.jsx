import { Link } from 'react-router-dom';
import { useState } from 'react';
import './styles.css'
import { useEffect } from 'react';

export default function Header() {

    function logOut() {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    return (
        <div className='header-container'>
            <header>
                <h1>🐈 Buscador de gatos por raça 🐈</h1>
                <Link className='user-button' to="/login" onClick={logOut}>SAIR</Link >
            </header>
            <nav className="menu">
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/americanBobtails">
                        <li>American Bobtails</li>
                    </Link>
                    <Link to="/abyssinian">
                        <li>Abyssinian</li>
                    </Link>
                    <Link to="/americanWirehair">
                        <li>Aegen</li>
                    </Link>
                    <Link to="/americanCurly">
                        <li>americanCurly</li>
                    </Link>
                    <Link to="/americanShortHair">
                        <li>AmericanShortHair</li>
                    </Link>
                    <Link to="/allCats">
                        <li>Todos os Gatos</li>
                    </Link>
                    <Link to="/breedNotListed">
                        <li>Buscar raças não listadas</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}