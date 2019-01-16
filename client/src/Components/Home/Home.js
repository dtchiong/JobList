import React, { Component } from "react";
import { Grid, Row, Panel } from "react-bootstrap";

import WelcomePanel from "../WelcomePanel/WelcomePanel";
import Table from "../Table/Table";

class Home extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <WelcomePanel user={this.props.user} auth={this.props.auth} />
          </Row>
          <Row>
            <Panel>
              <Table />
            </Panel>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
