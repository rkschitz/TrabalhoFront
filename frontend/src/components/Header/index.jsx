import { Link } from 'react-router-dom';
import './styles.css';
import logo from "../../assets/images/logo.png";
import LogoutButton from '../Logout';
import { useContext } from 'react';
import { AuthContext } from '../../auth/Context';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
    const { token } = useContext(AuthContext);

    return (
        <Navbar className="navbar-container">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Nav className="mx-auto">
                    <Nav.Link href="/" className='custom-nav-link mx-3'>HOME</Nav.Link>
                    <Nav.Link href="/favorites" className='custom-nav-link mx-3'>FAVORITES</Nav.Link>
                    <Nav.Link href="/feed" className='custom-nav-link mx-3'>FEED</Nav.Link>
                    {token && <Nav.Link href="/profile" className='custom-nav-link mx-3'>PROFILE</Nav.Link>}
                </Nav>
                {token && <LogoutButton />}
            </Container>
        </Navbar>
    );
}
