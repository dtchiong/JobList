import React, { Component } from "react";
import "./welcomePanel.css"

class WelcomePanel extends Component {

    render() {
        const user = this.props.user;
        let name = "Guest User";
        if (user.firstName || user.lastName) {
            name = user.firstName + " " + user.lastName;
        }

        return (
            <div className="welcome">
                <h1 className="text">Welcome</h1>
                <h1 className="text name">{name}</h1>
            </div>
        );
    }
}

export default WelcomePanel;