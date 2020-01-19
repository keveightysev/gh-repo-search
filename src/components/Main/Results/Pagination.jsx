import React, { useState, useEffect } from "react";
import {
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleRight,
  FaAngleDoubleRight
} from "react-icons/fa";
import { Link } from "@reach/router";

import { useRepoSearchState } from "../../../contexts";
import { paginate } from "../../../utils";

const Pagination = ({ page }) => {
  const [linkArray, setLinkArray] = useState([]);
  const [shownLinks, setShownLinks] = useState([]);
  const { totalCount, resultLimit } = useRepoSearchState();

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
            <Link to="../1">
              <FaAngleDoubleLeft />
            </Link>
            <Link to={`../${Number(page) - 1}`}>
              <FaAngleLeft />
            </Link>
          </>
        )}
        {shownLinks.map(el => {
          return (
            <Link to={`../${el}`} key={el}>
              {el}
            </Link>
          );
        })}
        {linkArray[linkArray.length - 1] &&
        page !== linkArray[linkArray.length - 1].toString() ? (
          <>
            <Link to={`../${Number(page) + 1}`}>
              <FaAngleRight />
            </Link>
            <Link to={`../${linkArray[linkArray.length - 1]}`}>
              <FaAngleDoubleRight />
            </Link>
          </>
        ) : null}
      </nav>
    )
  );
};

export default Pagination;
