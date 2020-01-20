import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

import Results from "../components/Main/Results";
import { RepoSearchProvider } from "../contexts";

describe("Results Page", () => {
  test("renders when data is provided", async () => {
    axiosMock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { items: [], total_count: 1 } })
    );

    const testState = {
      searchTerm: "testing",
      resultLimit: 5,
      currentPage: 1,
      totalCount: 1,
      items: [],
      isFetching: false,
      error: false
    };

    const { container, getByText } = render(
      <RepoSearchProvider initialState={testState}>
        <Results page="1" />
      </RepoSearchProvider>
    );
    expect(container).toBeInTheDocument();

    const header = await waitForElement(() => getByText(/repo found/i));

    expect(header).toBeInTheDocument();

    expect(axiosMock.get).toHaveBeenCalled();
  });
});
