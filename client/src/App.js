import React, { Component } from "react";
import SaveEntryButton from "./InsertEntry/SaveEntryButton";
import Requests from "./Requests";
import HeaderBar from "./HeaderBar/HeaderBar";
import "./app.css";

class App extends Component {
  state = {
  };

  //NOTE: the "container" classname is from bootstrap and makes our content centered instead of using 100% width
  render() {
    return (
      <div className="container">
        <div className="App">
          <HeaderBar
            user={this.props.user}
            onRef={ref => (this.child = ref)}
            history={this.props.history}
            auth={this.props.auth}
            setUserProfile={this.setUserProfile}
            clearUserId={this.props.clearUserId}
            insertUserIfNew={this.props.requests.insertUserIfNew}
          />
          <div className="app-body">
            <SaveEntryButton />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
