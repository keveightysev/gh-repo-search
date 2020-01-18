import React from "react";

import { useRepoSearchState } from "../../../contexts";
import ListingCard from "./ListingCard";

const Listing = ({ page }) => {
  const { items } = useRepoSearchState();

  return (
    <div>
      {items.map(repo => {
        return <ListingCard key={repo.id} repo={repo} />;
      })}
    </div>
  );
};

export default Listing;
