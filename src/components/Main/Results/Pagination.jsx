import React, { useState, useEffect } from "react";
import {
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleRight,
  FaAngleDoubleRight
} from "react-icons/fa";
import { Link } from "@reach/router";

import { useRepoSearchState, useRepoSearchDispatch } from "../../../contexts";
import { paginate } from "../../../utils";

const Pagination = ({ page }) => {
  const [linkArray, setLinkArray] = useState([]);
  const [shownLinks, setShownLinks] = useState([]);
  const { totalCount, resultLimit } = useRepoSearchState();
  const dispatch = useRepoSearchDispatch();

  useEffect(() => {
    const results = Number(totalCount) > 1000 ? 1000 : Number(totalCount);
    const limit = Number(resultLimit);
    const currentPage = Number(page);
    const links = new Array(Math.ceil(results / limit));
    for (let i = 0; i < links.length; i += 1) {
      links[i] = i + 1;
    }
    setLinkArray(links);
    setShownLinks(paginate(currentPage, links));
  }, [totalCount, resultLimit, page]);

  return (
    linkArray.length > 1 && (
      <nav>
        {page !== "1" && (
          <>
            <Link
              to="../1"
              onClick={() => dispatch({ type: "SET_PAGE", payload: 1 })}
              className="no-border"
            >
              <FaAngleDoubleLeft />
            </Link>
            <Link
              to={`../${Number(page) - 1}`}
              className="no-border"
              onClick={() =>
                dispatch({ type: "SET_PAGE", payload: Number(page) - 1 })
              }
            >
              <FaAngleLeft />
            </Link>
          </>
        )}
        {shownLinks.map(el => {
          return (
            <Link
              to={`../${el}`}
              key={el}
              className={el.toString() === page && "active"}
              onClick={() => dispatch({ type: "SET_PAGE", payload: el })}
            >
              {el}
            </Link>
          );
        })}
        {linkArray[linkArray.length - 1] &&
        page !== linkArray[linkArray.length - 1].toString() ? (
          <>
            <Link
              to={`../${Number(page) + 1}`}
              onClick={() =>
                dispatch({ type: "SET_PAGE", payload: Number(page) + 1 })
              }
              className="no-border"
            >
              <FaAngleRight />
            </Link>
            <Link
              to={`../${linkArray[linkArray.length - 1]}`}
              onClick={() =>
                dispatch({
                  type: "SET_PAGE",
                  payload: linkArray[linkArray.length - 1]
                })
              }
              className="no-border"
            >
              <FaAngleDoubleRight />
            </Link>
          </>
        ) : null}
      </nav>
    )
  );
};

export default Pagination;
