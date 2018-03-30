import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { disconnect, connect } from './socket/api';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class Header extends Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/" onClick={disconnect}>RPG ToolBox</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer onClick={connect} to="/roll"><NavItem activeKey={1} eventKey={1}>Roll</NavItem></LinkContainer>
                        <LinkContainer onClick={disconnect} to="/messenger"><NavItem activeKey={1} eventKey={2}>Messenger</NavItem></LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer onClick={disconnect} to="/init"><NavItem activeKey={1} eventKey={1}>Initiative</NavItem></LinkContainer>
                        <LinkContainer onClick={disconnect} to="/maps"><NavItem activeKey={1} eventKey={2}>Maps</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;