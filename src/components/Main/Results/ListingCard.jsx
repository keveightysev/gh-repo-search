import React from "react";
import { Link } from "@reach/router";

const ListingCard = ({ repo }) => {
  return (
    <Link to={`/repos/${repo.id}`}>
      <h3>{repo.name}</h3>
      <p>Author: {repo.owner?.login}</p>
      <div>
        <p>Stars: {repo.stargazers_count}</p>
        <p>Watchers: {repo.watchers}</p>
      </div>
    </Link>
  );
};

export default ListingCard;
