import React, { Component } from "react";
import { Grid, Row, Column } from "react-bootstrap";

import WelcomePanel from "../Components/WelcomePanel/WelcomePanel";
import Table from "../Components/Table/Table";

class Home extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <WelcomePanel user={this.props.user} auth={this.props.auth} />
          </Row>
          <Row>
            <Table />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
