import React from "react";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <main className="loading">
      <GridLoader size={50} />
    </main>
  );
};

export default Loading;
