import React, { useState, useEffect } from "react";
import {
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleRight,
  FaAngleDoubleRight
} from "react-icons/fa";
import { Link } from "@reach/router";

import { useRepoSearchState } from "../../../contexts";

const Pagination = ({ page }) => {
  const [linkArray, setLinkArray] = useState([]);
  const { totalCount, resultLimit } = useRepoSearchState();
  useEffect(() => {
    const results = Number(totalCount);
    const limit = Number(resultLimit);
    let links = new Array(Math.ceil(results / limit));
    for (let i = 0; i < links.length; i += 1) {
      links[i] = i + 1;
    }
    setLinkArray(links);
  }, [totalCount, resultLimit]);
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
        {linkArray.map(el => {
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
