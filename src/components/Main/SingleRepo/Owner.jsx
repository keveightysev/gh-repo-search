import React from "react";
import { FaExternalLinkAlt, FaUsers } from "react-icons/fa";
import { GoRepo } from "react-icons/go";

const Owner = ({ owner }) => {
  return (
    <section className="owner">
      <img src={owner?.avatar_url} alt="" />
      <div>
        <h3>{owner?.login}</h3>
        <a href={owner?.url} target="_blank" rel="noreferrer noopener">
          View Profile on GitHub <FaExternalLinkAlt />
        </a>
        <p>
          <FaUsers />
          {owner?.followers} followers
        </p>
        <p>
          <GoRepo />
          {owner?.public_repos} repositories
        </p>
      </div>
    </section>
  );
};

export default Owner;
