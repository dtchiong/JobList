import React, { Component } from "react";
import { Grid, Row, Column } from "react-bootstrap";
import HeaderBar from "./HeaderBar/HeaderBar";
import WelcomePanel from "./Components/WelcomePanel/WelcomePanel";
import Table from "./Components/Table/Table";
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
          <WelcomePanel user={this.props.user} auth={this.props.auth} />
        </div>
        <div>
          <Grid>
            <Row />
            <Row>
              <Table />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
