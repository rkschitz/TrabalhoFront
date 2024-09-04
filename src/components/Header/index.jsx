import viteLogo from '../../../public/vite.svg'
import reactLogo from '../../assets/react.svg'
import { Link } from 'react-router-dom';
import './styles.css'

export default function Header() {

    return (
        <>
            <header>
                <h1>Minha Página React</h1>
                <img src={reactLogo} alt='Logo do React' />
                <img src={viteLogo} alt='Logo do Vite' />
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
                        <li>allCats</li>
                    </Link>
                    <Link to="/breedNotListed">
                        <li>Buscar racas não listadas</li>
                    </Link>
                </ul>
            </nav>
        </>
    )
}