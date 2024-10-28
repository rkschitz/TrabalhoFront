import { Link } from 'react-router-dom';
import './styles.css'
import logo from "../../assets/images/logo.png";
import LogoutButton from '../Logout';
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';

export default function Header() {

    const { token, role } = useContext(AuthContext);

    const toggleMenu = () => {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
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
                        {/* <Link to="/americanBobtails">
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
                        </Link> */}
                        <Link to="/favorites"><li>Favoritos</li></Link>
                        <Link to="/feed"><li>Feed</li></Link>

                        {/* <div className="menu-toggle" onClick={toggleMenu}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div> */}
                         {token && <LogoutButton />}
                        {token && <Link to="/profile">Perfil</Link>}
                        {role === 'admin' && <Link to="/users">Gerenciar usuários</Link>} 
                    </ul>
                </nav>



            </header>
        </div>
    )
}
