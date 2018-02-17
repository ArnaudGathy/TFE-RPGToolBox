import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export class Header extends Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">RPG ToolBox</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem componentClass="span" activeKey={1} eventKey={1}><Link to="/init">Initiative</Link></NavItem>
                        <NavItem componentClass="span" activeKey={1} eventKey={2}><Link to="/messenger">Messenger</Link></NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem componentClass="span" activeKey={1} eventKey={1}><Link to="/roll">Roll</Link></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;