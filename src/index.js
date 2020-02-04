import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import AppPage from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <AppPage />
  </Router>,
  document.getElementById("root")
);
