import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import "./NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavBar = (props) => {
    const { user, logOut } = useFirebase();
    
    const { page } = props;
    let bgColor = 'rgba(240,230,140, 0.4)';
    if (page === 'home') {
        bgColor = 'transparent';
    }
    const handleLogOutButton = () => {
        logOut();
    }
    const url = `/orders/${user.email}`;

    return (
        <div style={{ backgroundColor: bgColor }} className='myNavbar'>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/home'><span className='nav-brand'>WorldWide Buddy</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} className='nav-text' to='/home'>Home</Nav.Link>
                            <Nav.Link as={Link} className='nav-text' to='/plans'>Tour Plans</Nav.Link>
                            <Nav.Link as={Link} className='nav-text' to={!user.email ? '/login' : '/addplan'}>
                                Add a plan
                            </Nav.Link>
                            <Nav.Link as={Link} className='nav-text' to={!user.email ? '/login' : '/manageplans'}>
                                Manage Plans
                            </Nav.Link>
                            <Nav.Link as={Link} className='nav-text' to={!user.email ? '/login' : `${url}`}>
                               My Plans
                            </Nav.Link>
                            <Nav.Link as={Link} className='nav-text' to={!user.email ? '/login' : '/allorders'}>
                               All Orders
                            </Nav.Link>
                        </Nav>
                        {
                            !user?.email && <Link to='/login'><button className='signInButton'>Sign In</button></Link>
                        }
                        {
                            user?.email && <button onClick={handleLogOutButton} className='signInButton'>Sign Out</button>
                        }
                        <h6 style={user?.email ? { color: 'black' } : { color: 'transparent' }} className='ms-5 text-warning userName'><FontAwesomeIcon icon={faUser} className='me-2' />{user.displayName}</h6>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;



