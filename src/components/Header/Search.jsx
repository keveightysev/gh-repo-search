import React, { useState } from "react";
import { navigate } from "@reach/router";

import { useRepoSearchDispatch } from "../../contexts";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useRepoSearchDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
    navigate("/results/1");
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search for a GitHub repository by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
