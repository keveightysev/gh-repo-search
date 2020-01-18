import React from "react";

import { useRepoSearchState } from "../../../contexts";
import LimitDropDown from "./LimitDropDown";

const ResultsHeader = () => {
  const { totalCount, searchTerm } = useRepoSearchState();
  return (
    <>
      <h2>
        {totalCount} repo{totalCount !== 1 && "s"} found with term '{searchTerm}
        '
      </h2>
      <div>
        Results per page:
        <LimitDropDown />
      </div>
    </>
  );
};

export default ResultsHeader;
