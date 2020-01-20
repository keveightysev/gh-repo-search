import React from "react";

import { useRepoSearchState } from "../../../contexts";
import ListingCard from "./ListingCard";

const Listing = () => {
  const { items } = useRepoSearchState();

  return (
    <section className="cards">
      {items.map(repo => {
        return <ListingCard key={repo.id} repo={repo} />;
      })}
    </section>
  );
};

export default Listing;
