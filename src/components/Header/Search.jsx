import React, { useState } from "react";
import { get } from "axios";
import { navigate } from "@reach/router";

import { useRepoSearchState, useRepoSearchDispatch } from "../../contexts";
import { querify } from "../../utils";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const state = useRepoSearchState();
  const dispatch = useRepoSearchDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const query = querify({
      q: `name:${searchTerm}`,
      sort: "stars",
      per_page: state.resultLimit,
      page: state.currentPage
    });
    try {
      dispatch({ type: "FETCH_START" });
      const { data } = await get(
        `https://api.github.com/search/repositories?${query}`
      );
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          searchTerm,
          items: data.items,
          totalCount: data.total_count
        }
      });
      setSearchTerm("");
      navigate("/results");
    } catch (error) {
      console.log(error.response);
    }
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
