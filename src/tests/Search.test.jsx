import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Search from "../components/Header/Search.jsx";
import { RepoSearchProvider } from "../contexts";

afterEach(cleanup);

describe("Search.jsx", () => {
  test("Search input updates", () => {
    const { getByPlaceholderText } = render(
      <RepoSearchProvider>
        <Search />
      </RepoSearchProvider>
    );
    const input = getByPlaceholderText(
      /Search for a GitHub repository by name/i
    );

    fireEvent.change(input, { target: { value: "Search" } });
    expect(input.value).toBe("Search");
  });
});
