import React from "react";

import { useRepoSearchDispatch, useRepoSearchState } from "../../../contexts";

const LimitDropDown = () => {
  const { resultLimit } = useRepoSearchState();
  const dispatch = useRepoSearchDispatch();

  const handleChange = e => {
    dispatch({ type: "SET_LIMIT", payload: e.target.value });
    e.target.blur();
  };

  return (
    <select name="limit" id="limit" value={resultLimit} onChange={handleChange}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
  );
};

export default LimitDropDown;
