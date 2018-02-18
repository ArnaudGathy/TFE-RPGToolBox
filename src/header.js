import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
                        <LinkContainer to="/roll"><NavItem activeKey={1} eventKey={1}>Roll</NavItem></LinkContainer>
                        <LinkContainer to="/messenger"><NavItem activeKey={1} eventKey={2}>Messenger</NavItem></LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/init"><NavItem activeKey={1} eventKey={1}>Initiative</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;