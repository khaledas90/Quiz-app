import React from 'react';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaBars } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LogOutUser } from '../store/UserSlice';
function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.User);

    const dataUser = useSelector((state) => state.user.userData);

    console.log(dataUser);
    
 const handleLogout = () => {
    dispatch(LogOutUser());
    window.location.reload();
 }
    return (
        <Navbar collapseOnSelect expand="md" className="header">
            <Container>
                <Navbar.Brand className="brand">Quiz<span>Time</span></Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav">
                    <FaBars />
                </Navbar.Toggle>
                
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link><Link to="/Quiz">Quiz</Link></Nav.Link>
                        <Nav.Link><Link to="/instructions">Instructions</Link></Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center justify-content-center">
                        {dataUser && dataUser.length > 0 ? (
                            <div>
                             <button type="button" onClick={handleLogout} className='btnHeader'>Logout</button>
                            </div>
                           
                        ) : (
                            <>
                                <Link to="/signUp" className="btn btn-primary py-2 px-4 m-lg-1 m-sm-1 m-md-1 btnHeader">Register</Link>
                                <Link to="/login" className="btn btn-primary py-2 px-4 btnHeader">Login</Link>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
