import React from "react";
import { Link } from "@reach/router";

import "../../styles/Header.scss";

import Search from "./Search";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>GitHub Repo Search</h1>
      </Link>
      <Search />
    </header>
  );
};

export default Header;
