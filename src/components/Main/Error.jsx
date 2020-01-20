import React from "react";

const Error = ({ code }) => {
  return (
    <main>
      <img src={`https://http.cat/${code}`} alt="" />
    </main>
  );
};

export default Error;
