import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export class Header extends Component {

    render() {
        return (
            <div></div>
        )
    }
}

export default Header;

            {/* <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink to="/">RPG ToolBox</NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem activeKey={1} eventKey={1}><NavLink to="/init">Initiative</NavLink></NavItem>
                        <NavItem activeKey={1} eventKey={2}><NavLink to="/messenger">Messenger</NavLink></NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem activeKey={1} eventKey={1}><NavLink to="/roll">Roll</NavLink></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> */}