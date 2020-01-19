import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Owner = ({ owner }) => {
  return (
    <div>
      <img src={owner?.avatar_url} alt="" />
      <h3>{owner?.login}</h3>
      <a href={owner?.url} target="_blank" rel="noreferrer noopener">
        View Profile on GitHub <FaExternalLinkAlt />
      </a>
      <p>{owner?.followers} followers</p>
    </div>
  );
};

export default Owner;
