import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";

class LoginControl extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
    this.props.clearUserId();
  }

  //Router passes auth to App which passes auth to LoginControl
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
          {!isAuthenticated() && (
            <Button
              onClick={this.login.bind(this)}
            >
              Log In
            </Button>
          )}
          {isAuthenticated() && (
            <Button
              onClick={this.logout.bind(this)}
            >
              Log Out
            </Button>
          )}
      </div>
    );
  }
}

export default LoginControl;
