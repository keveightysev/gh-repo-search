import React from "react";
import { Router } from "@reach/router";

import Landing from "./Landing";
import Results from "./Results";

const Main = () => {
  return (
    <Router>
      <Landing path="/" exact />
      <Results path="/results" />
    </Router>
  );
};

export default Main;
