import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Home from "./Home/Home";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";
import Requests from "./Requests";

const auth = new Auth();

class RoutesContainer extends Component {

  //Q: Why are there brackets around location?
  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
      console.log("after auth.handleAuth");
    }
  };

  constructor() {
    super();
    //call function to set userId here
    console.log("RoutesContainer: Constructor()");
  }

  state = {
    user: {
      userId: null,
      firstName: null,
      lastName: null,
      email: null
    }
  };

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={props => <App auth={auth} {...props} />} />
          <Route
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              this.handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          <Route path="/test" render={props => <h2> hi billy bob </h2>} />
        </div>
      </Router>
    );
  }
}

export default RoutesContainer;
