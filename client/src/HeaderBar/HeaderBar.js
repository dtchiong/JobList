import React, { Component } from "react";
import { Nav, Navbar, NavItem, Button } from "react-bootstrap";
//import "../header.css";

class HeaderBar extends Component {
  render() {
    return (
      <div className="header">
        <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand id="brand">JobLogger</Navbar.Brand>
            </Navbar.Header>
            <Nav className="tab-link">
              <NavItem eventKey={1} href="#">
                Home
              </NavItem>
              <NavItem eventKey={2} href="#">
                Profile
              </NavItem>
            </Nav>
            <Nav pullRight>
            </Nav>
        </Navbar>
      </div>
    );
  }
}

export default HeaderBar;
