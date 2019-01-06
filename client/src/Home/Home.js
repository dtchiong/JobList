import React, { Component } from "react";
import { Grid, Row, Column } from "react-bootstrap";

import Table from "../Components/Table/Table";

class Home extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row />
          <Row>
            <Table />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
