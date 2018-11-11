import React, { Component } from "react";
import { Grid, Row, Column } from "react-bootstrap";
import Requests from "./Requests";
import HeaderBar from "./HeaderBar/HeaderBar";
import WelcomePanel from "./Components/WelcomePanel/WelcomePanel";
import SaveEntryButton from "./InsertEntry/SaveEntryButton";
import "./app.css";

class App extends Component {

  //NOTE: the "container" classname is from bootstrap and makes our content centered instead of using 100% width
  render() {
    return (
      <div className="container">
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
          <Grid>
            <Row>
              <WelcomePanel user={this.props.user} auth={this.props.auth}/>
            </Row>
            <Row>
              <SaveEntryButton />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
