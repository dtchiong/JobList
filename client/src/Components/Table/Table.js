import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./table.css";

class myTable extends Component {
  columns = [
    "Company Name",
    "Job Title",
    "Website",
    "City",
    "Apply Method",
    "Apply Date",
    "Got Response",
    "App Status",
    "Interview Date",
    "Notes"
  ];

  rows = count => {
    let table = [];

    for (let i = 0; i < count; i++) {
      let td = [];
      for (let j = 0; j < this.columns.length; j++) {
        td.push(<td>{`Row ${i + 1}`}</td>);
      }
      table.push(<tr>{td}</tr>);
    }
    return table;
  };

  render() {
    const colHeaders = this.columns.map(col => <th>{col}</th>);

    return (
        <Table className="table table-fixed" responsive style={{ marginTop: "20px" }}>
          <thead>
            <tr>{colHeaders}</tr>
          </thead>
          <tbody>{this.rows(30)}</tbody>
        </Table>
    );
  }
}

export default myTable;
