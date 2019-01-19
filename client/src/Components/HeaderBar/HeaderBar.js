import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import LoginControl from "../../Auth/LoginControl";
import history from "../../Utility/history";

class HeaderBar extends Component {

  /*Takes the key from the selected NavItem and changes the page 
   * using history.replace will prevent the back button from saving the history clicks from 
   * navigating between home, profile, and about, as opposed to history.push
   */
  handleSelectedPage = key => {
    //ensures that the page is only re-rendered when switching routes
    if (key === window.location.pathname) {
      return;
    }

    switch(key) {
      case "/home":
        history.replace("/home");
        break;
      case "/profile":
        history.replace("/profile");
        break;
      case "/about":
        history.replace("/about");
        break;
      default:
        history.replace("/");
    }
  }

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
              JobList
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="tab-link" style={navLinkStyle} onSelect={key=>this.handleSelectedPage(key)}>
              <NavItem eventKey={"/home"} >
                Home
              </NavItem>
              <NavItem  eventKey={"/profile"} >
                Profile
              </NavItem>
              <NavItem eventKey={"/about"} > 
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
