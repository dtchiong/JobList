import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import "../semantic/dist/semantic.min.css";
import "bootstrap/dist/css/bootstrap.css";
import RoutesContainer from "./routes";

ReactDOM.render(
  <RoutesContainer/>,
  document.getElementById("root") // eslint-disable-line no-undef
);
