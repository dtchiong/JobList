import React, { Component } from "react";
import "./welcomePanel.css";

class WelcomePanel extends Component {

  login() {
      this.props.auth.login();
  }

  render() {
    
    const user = this.props.user;
    //If the user is logged in, we should his name if it's set or his email
    let displayName = "";
    if (user.firstName || user.lastName) {
        if (user.firstName) {displayName += user.firstName}
        displayName += " ";
        if (user.lastName) {displayName += user.lastName}
    } else if (user.email) {
      displayName = user.email.substr(0, user.email.indexOf("@"));
    }else {
        displayName = "Guest User";
    }
    displayName += ".";

    return (
      <div className="welcome">
        <h1 className="text">Welcome</h1>
        <h1 className="text name">{displayName}</h1>
        {!user.email && 
            <h2 className="text prompt"><a onClick={this.login.bind(this)}>Login</a> to save your list.</h2>
        }
      </div>
    );
  }
}

export default WelcomePanel;
