import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

import SingleRepo from "../components/Main/SingleRepo";
import { RepoSearchProvider } from "../contexts";

describe("Single Repo Page", () => {
  test("Renders successfully", async () => {
    axiosMock.get.mockImplementation(url => {
      switch (url) {
        case "http://languages.mock":
          return Promise.resolve({
            data: {
              JavaScript: 1243
            }
          });
        case "http://followers.mock":
          return Promise.resolve({
            data: ["a single follower"]
          });
        default:
          return Promise.resolve({
            data: {
              id: 1234,
              languages_url: "http://languages.mock",
              followers_url: "http://followers.mock",
              owner: {
                avatar_url: "http://mock.image",
                login: "testuser",
                url: "http://github.com/testuser"
              },
              name: "Magnificent Testing Repo",
              created_at: "2020-01-01T20:22:44Z",
              updated_at: "2020-01-01T20:22:44Z",
              description: "This repo was created as a test"
            }
          });
      }
    });
    const { container, getByText } = render(
      <RepoSearchProvider>
        <SingleRepo id="1234" />
      </RepoSearchProvider>
    );
    expect(container).toBeInTheDocument();

    const repoDescription = await waitForElement(() =>
      getByText(/This repo was created as a test/i)
    );

    expect(repoDescription).toBeInTheDocument();

    expect(axiosMock.get).toHaveBeenCalled();
  });
});
