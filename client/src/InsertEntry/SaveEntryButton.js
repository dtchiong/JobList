import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Requests from "../Requests";

class SaveEntryButton extends Component {

  Entry(companyName, jobTitle) {
    this.companyName = companyName;
    this.jobTitle = jobTitle;
    this.website = "www.target.com";
    this.area = "SF";
    this.applyMethod = "online";
    this.applyDate = null;
    this.gotResponse = false;
    this.appStatus = "applied";
    this.interviewDate = null;
    this.notes = "testing testing 123";
  }

  render() { 

    const entry1 = new this.Entry("Target", "cashier");
    const entry2 = new this.Entry("Costco", "cashier");
    const entry3 = new this.Entry("Walmart", "cashier");

    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={() => {
            Requests.insertUserIfNew("18");
          }}
        >
          Insert User
        </Button>

        <Button
          bsStyle="primary"
          onClick={() => {
            Requests.updateUser({userId: "1", firstName: "4Head", lastName: "Bill"});
          }}
        >
          Update User
        </Button>

        <Button
          bsStyle="primary"
          onClick={() => {
            Requests.insertEntry({userId: "1"}, entry3);
          }}
        >
          Insert Entry
        </Button>

        <Button
          bsStyle="primary"
          onClick={() => {
            Requests.updateEntry({userId: "1"}, entry3, entry2);
          }}
        >
          Update Entry
        </Button>

        <Button
          bsStyle="primary"
          onClick={() => {
            Requests.deleteEntry({userId: "1"}, entry3);
          }}
        >
          Delete Entry
        </Button>
      </div>
    );
  }
}

export default SaveEntryButton;
