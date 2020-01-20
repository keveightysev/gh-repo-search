import React from "react";
import ReactDOM from "react-dom";

import "./styles/normalize.scss";

import App from "./App";

import { RepoSearchProvider } from "./contexts";

ReactDOM.render(
  <RepoSearchProvider>
    <App />
  </RepoSearchProvider>,
  document.getElementById("root")
);
