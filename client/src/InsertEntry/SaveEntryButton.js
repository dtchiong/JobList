import React, { Component } from "react";
import { Button } from "react-bootstrap";
import SaveEntryBackend from "./SaveEntryBackend";

class SaveEntryButton extends Component {
  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={() => {
            SaveEntryBackend.insertUserIfNew("18");
          }}
        >
          Insert User
        </Button>

        <Button
          bsStyle="primary"
          onClick={() => {
            SaveEntryBackend.updateUser({userId: "1", firstName: "Dyrone", lastName: "Tonque"});
          }}
        >
          Update User
        </Button>
      </div>
    );
  }
}

export default SaveEntryButton;
