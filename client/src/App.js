import React, { Component } from "react";
import LoginControl from "./Auth/LoginControl";
import SaveEntryButton from "./InsertEntry/SaveEntryButton";
import Requests from "./Requests";
import HeaderBar from "./HeaderBar/HeaderBar";

import "./app.css";

class App extends Component {
  state = {
    selectedFoods: []
  };

  render() {
    return (
      <div className="App">
        <HeaderBar />
        <div className="app-body">
          <LoginControl
            user={this.props.user}
            onRef={ref => (this.child = ref)}
            history={this.props.history}
            auth={this.props.auth}
            setUserProfile={this.setUserProfile}
            clearUserId={this.props.clearUserId}
            insertUserIfNew={this.props.requests.insertUserIfNew}
          />

          <SaveEntryButton />
        </div>
      </div>
    );
  }
}

export default App;
