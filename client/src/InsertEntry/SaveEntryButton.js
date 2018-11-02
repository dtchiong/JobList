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
            SaveEntryBackend.insertUserIfNew("13");
          }}
        >
          Insert User
        </Button>
      </div>
    );
  }
}

export default SaveEntryButton;
