import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './navigation_bar.css'; // Import the CSS file
import logo from './media/map.png'

const NavigationBar = () => {
  return (
    <Navbar variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand classname="basic-navbar-nav" as={Link} to="/">
          <img
            src={logo}
            height="60"
            width="auto"
            className="d-inline-block-left"
            alt="world logo"
          />{' '}
          World Selector
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/map">Map</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
