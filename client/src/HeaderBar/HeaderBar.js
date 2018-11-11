import React, { Component } from "react";
import { Nav, Navbar, NavItem, Button } from "react-bootstrap";
import LoginControl from "../Auth/LoginControl";

class HeaderBar extends Component {
  render() {
    const navBarStyle = {
      display: "inline-block",
      float: "none",
      padding: "10px"
    };

    const brandTextStyle = {
      verticalAlign: "middle",
      fontSize: "1.5em",
      textAlign: "bottom"
    };

    const navLinkStyle = {
      fontSize: "1.1em"
    };

    return (
      <div className="header">
        <Navbar style={navBarStyle} inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand style={brandTextStyle} id="brand">
              JobLogger
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="tab-link" style={navLinkStyle}>
              <NavItem eventKey={1} href="#">
                Home
              </NavItem>
              <NavItem eventKey={2} href="#">
                Profile
              </NavItem>
              <NavItem eventKey={3} href="#">
                About
              </NavItem>
            </Nav>
            <Nav style={navBarStyle} pullRight>
              <LoginControl
                user={this.props.user}
                onRef={ref => (this.child = ref)}
                history={this.props.history}
                auth={this.props.auth}
                setUserProfile={this.props.setUserProfile}
                clearUserId={this.props.clearUserId}
                insertUserIfNew={this.props.insertUserIfNew}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default HeaderBar;
