import React, { Component } from "react";
//mport {Button} from "react-bootstrap";
import { Table } from "react-bootstrap";
import "./table.css";
import history from "../../Utility/history";

class myTable extends Component {
  columns = [
    "Company Name",
    "Job Title",
    "City",
    "Website",
    "Apply Date",
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

  changePage = () => {
    history.replace("/home");
  }

  render() {
    const colHeaders = this.columns.map(col => <th>{col}</th>);

    return (
        <div>
          <Table className="table table-fixed" responsive style={{ marginTop: "20px" }}>
          <thead>
            <tr>{colHeaders}</tr>
          </thead>
          <tbody>{this.rows(30)}</tbody>
        </Table>
        </div>

    );
  }
}

export default myTable;
