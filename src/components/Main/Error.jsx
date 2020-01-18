import React from "react";

const Error = ({ code }) => {
  return (
    <>
      <img src={`https://http.cat/${code}`} alt="" />
    </>
  );
};

export default Error;
