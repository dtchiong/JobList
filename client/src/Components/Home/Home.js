import React, { Component } from "react";
import { Grid, Row, Panel } from "react-bootstrap";

import WelcomePanel from "../WelcomePanel/WelcomePanel";
import Table from "../Table/Table";

var deepEqual = require('deep-equal');

class Home extends Component {

  constructor(props, context) {
    
    super(props, context);
    
    this.state = {
      list: null
    }
  }

  /* Only called once in the initial app loading
  * If the user isn't null, then we call componentDidUpdate() to fetch our data
  * Maybe refactor data fetching logic out of componentDidUpdate into a function
  */
  componentDidMount() {
    if (this.props.user.userId != null) {
      this.componentDidUpdate(null, this.state);
    }
  }

  /* Fetches the user's list if the user is not null and sets the state */
  componentDidUpdate(prevProps, prevState, snapshot) {
    const user = this.props.user;

    if (user.userId != null ) {

     if (prevState.list != null) {
       return;
     }
      
      this.props.requests.getAllEntries(user).then( (res)=>{
        console.log(res);
        this.setState( {list: res.entries});
      } );  
    }
  }

  /* Compares the old state to the new state and only re-renders using a deepEqual
   * and only re-renders if the states are different - to minimize renders
   */
  shouldComponentUpdate(nextProps, nextState) {
    const sameUserProps = deepEqual(nextProps.user, this.props.user);
    const sameState = deepEqual(nextState, this.state);
    if (sameUserProps && sameState) {
      return false;
    }
    return true;
  }

  render() {
    console.log("Home render() list: "+this.state.list);
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
