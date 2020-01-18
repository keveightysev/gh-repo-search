import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { RepoSearchProvider } from "./contexts";

ReactDOM.render(
  <RepoSearchProvider>
    <App />
  </RepoSearchProvider>,
  document.getElementById("root")
);
