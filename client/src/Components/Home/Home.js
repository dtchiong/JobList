import React, { Component } from "react";
import { Grid, Row, Panel } from "react-bootstrap";

import WelcomePanel from "../WelcomePanel/WelcomePanel";
import Table from "../Table/Table";

class Home extends Component {

  componentDidMount() {
    console.log("Component did mount");
    const user = this.props.user;
    if (this.props.requests != null) {
      console.log("USERID: "+this.props.user.userId);
      (this.props.requests.getAllEntries(user)).then( (res)=>{
        console.log(res);
      } )
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT PROPS " + nextProps.user.userId); //start request to get All Entries here
  }

  render() {
    console.log("Home render()");
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
