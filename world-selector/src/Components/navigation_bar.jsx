import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './navigation_bar.css';
import logo from './media/map.png';

const NavigationBar = () => {
  return (
    <Navbar variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="60"
            width="auto"
            className="d-inline-block-left"
            alt="world logo"
          />
          World Selector
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/map">Map</NavLink>
            {/* Add more links here if needed */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
