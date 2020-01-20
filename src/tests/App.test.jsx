import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  getByText,
  waitForElement,
  act
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

import App from "../App";
import { RepoSearchProvider } from "../contexts";
import { renderWithRouter } from "./testUtils";

afterEach(cleanup);

describe("End-to-end", () => {
  test("App Renders", () => {
    const { getByText } = render(
      <RepoSearchProvider>
        <App />
      </RepoSearchProvider>
    );
    const header = getByText(/GitHub Repo Search/i);
    expect(header).toBeInTheDocument();
  });

  test("Can search for and open a repo link", async () => {
    axiosMock.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          items: [
            {
              id: 1234,
              name: "Magnificent Testing Repo",
              owner: {
                login: "testUser"
              },
              stargazers_count: 1,
              watchers: 1
            }
          ],
          total_count: 1
        }
      })
    );

    const {
      container,
      history: { navigate }
    } = renderWithRouter(
      <RepoSearchProvider>
        <App />
      </RepoSearchProvider>
    );

    const input = getByText(container, (c, element) => {
      return element.tagName.toLowerCase() === "input";
    });

    fireEvent.change(input, { target: { value: "iridigital" } });
    expect(input.value).toBe("iridigital");

    const search = getByText(container, (content, element) => {
      return (
        element.tagName.toLowerCase() === "button" &&
        content.startsWith("Search")
      );
    });
    act(() => {
      fireEvent.click(search);
    });

    expect(input.value).toBe("");

    await navigate("/results/1");

    const repoCard = await waitForElement(() =>
      getByText(container, /Magnificent Testing Repo/i)
    );
    expect(repoCard).toBeInTheDocument();

    axiosMock.get.mockImplementationOnce(url => {
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

    await act(async () => {
      await navigate("/repos/1234");
    });

    const repoDescription = await waitForElement(() =>
      getByText(container, /This repo was created as a test/i)
    );

    expect(repoDescription).toBeInTheDocument();
  });
});
