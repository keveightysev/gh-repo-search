import React, { useEffect } from "react";
import { Redirect, navigate } from "@reach/router";
import axios from "axios";

import "../../../styles/Results.scss";

import { querify } from "../../../utils";
import { useRepoSearchState, useRepoSearchDispatch } from "../../../contexts";
import Loading from "../Loading";
import ResultsHeader from "./ResultsHeader";
import Listing from "./Listing";
import Pagination from "./Pagination";

const Results = ({ page }) => {
  const { isFetching, searchTerm, resultLimit } = useRepoSearchState();
  const dispatch = useRepoSearchDispatch();

  useEffect(() => {
    let didCancel = false;
    const fetch = async () => {
      const query = querify({
        q: `${searchTerm} in:name`,
        sort: "stars",
        per_page: resultLimit,
        page
      });
      !didCancel && dispatch({ type: "FETCH_START" });
      try {
        const { data } =
          !didCancel &&
          (await axios.get(
            `https://api.github.com/search/repositories?${query}`
          ));
        !didCancel &&
          dispatch({
            type: "FETCH_SUCCESS",
            payload: {
              items: data.items,
              totalCount: data.total_count
            }
          });
      } catch (error) {
        console.log(error.response);
        navigate(`/error/${error.response?.status}`);
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    if (searchTerm) fetch();
    return () => {
      didCancel = true;
    };
  }, [dispatch, searchTerm, resultLimit, page]);

  return isFetching ? (
    <Loading />
  ) : !searchTerm ? (
    <Redirect to="/" noThrow />
  ) : (
    <main className="results">
      <ResultsHeader />
      <Listing />
      <Pagination page={page} />
    </main>
  );
};

export default Results;
