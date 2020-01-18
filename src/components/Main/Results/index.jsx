import React from "react";
import { Redirect } from "@reach/router";

import { useRepoSearchState } from "../../../contexts";
import Loading from "../Loading";
import ResultsHeader from "./ResultsHeader";

const Results = () => {
  const { isFetching, searchTerm } = useRepoSearchState();

  if (isFetching) return <Loading />;
  //   else if (!searchTerm) return <Redirect to="/" />;
  else
    return (
      <>
        <ResultsHeader />
      </>
    );
};

export default Results;
