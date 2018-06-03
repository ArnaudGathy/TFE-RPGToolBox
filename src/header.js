import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from './socket/api';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
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
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Game Master" id="gm-drop">
                            <LinkContainer to="/init"><NavItem activeKey={1} eventKey={1}>Initiative</NavItem></LinkContainer>
                            <LinkContainer to="/maps"><NavItem activeKey={1} eventKey={2}>Maps</NavItem></LinkContainer>
                        </NavDropdown>
                        <NavDropdown eventKey={3} title="Players" id="player-drop">
                            <LinkContainer onClick={connect} to="/roll"><NavItem activeKey={1} eventKey={1}>Roll</NavItem></LinkContainer>
                            <LinkContainer to="/messenger"><NavItem activeKey={1} eventKey={2}>Messenger</NavItem></LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;