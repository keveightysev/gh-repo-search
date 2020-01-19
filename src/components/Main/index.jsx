import React from "react";
import { Router } from "@reach/router";

import Landing from "./Landing";
import Results from "./Results";
import Error from "./Error";
import SingleRepo from "./SingleRepo";

const Main = () => {
  return (
    <Router>
      <Landing path="/" exact />
      <Error path="/error/:code" />
      <Results path="/results/:page" />
      <SingleRepo path="/repos/:id" />
    </Router>
  );
};

export default Main;
