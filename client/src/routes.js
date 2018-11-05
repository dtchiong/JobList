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
  componentDidMount() {
    auth.getUserProfile(this.setUserProfile);
  }

  state = {
    user: {
      userId: null,
      firstName: null,
      lastName: null,
      email: null
    }
  };

  //Q: Why are there brackets around location?
  handleAuthentication = async ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      await auth.handleAuthentication(this.doSetUserProfile, Requests.insertUserIfNew);
    }
  };

  /* This is the callback for the auth0's getUserProfile()
   * If there's an error, meaning the access token is incorrect, then we log out,
   * else we call the helper function to set the profile
   */
  setUserProfile = (err, user) => {
    if (err) {
      //TODO: fix references to log out here
      //console.log("setUserProfile: "+err);
      //this.child.logout();
      return;
    }
    this.doSetUserProfile(user);
  };

  doSetUserProfile = user => {
    const newUser = {
      userId: user.sub,
      firstName: null,
      lastName: null,
      email: null
    };
    this.setState({ user: newUser });
  };

  /* Passed as prop to LoginControl to be used when logging out */
  clearUserId = () => {
    const nullUser = {
      userId: null,
      firstName: null,
      lastName: null,
      email: null
    };
    this.setState({ user: nullUser });
  };

  render() {
    console.log("render() -\n  userid: " + this.state.user.userId);

    return (
      <Router history={history}>
        <div>
          <Route
            path="/"
            render={props => (
              <App
                auth={auth}
                user={this.state.user}
                clearUserId={this.clearUserId}
                requests={Requests}
                {...props}
              />
            )}
          />
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
