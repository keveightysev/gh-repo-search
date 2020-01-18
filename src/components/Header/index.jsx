import React, { useState } from "react";
import axios from "axios";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=name:${searchTerm}&sort=stars&per_page=5`
    );
    console.log(data);
  };

  return (
    <header>
      <h1>GitHub Repo Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search for a GitHub repository by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
