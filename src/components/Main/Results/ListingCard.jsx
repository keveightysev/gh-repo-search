import React from "react";
import { Link } from "@reach/router";
import { FaStar, FaEye } from "react-icons/fa";

const ListingCard = ({ repo }) => {
  return (
    <Link to={`/repos/${repo.id}`} className="card">
      <h3>{repo.name}</h3>
      <p>
        Owner: <img src={repo.owner?.avatar_url} alt="" />
        {repo.owner?.login}
      </p>
      <aside>
        <p>
          {repo.stargazers_count} <FaStar />
        </p>
        <p>
          {repo.watchers} <FaEye />
        </p>
      </aside>
    </Link>
  );
};

export default ListingCard;
