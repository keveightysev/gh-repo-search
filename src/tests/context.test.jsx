import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import {
  RepoSearchProvider,
  useRepoSearchState,
  useRepoSearchDispatch
} from "../contexts";

describe("Context/Reducer Tests", () => {
  test("SET_SEARCH_TERM action changes searchTerm", () => {
    const { result } = renderHook(
      () => ({
        state: useRepoSearchState(),
        dispatch: useRepoSearchDispatch()
      }),
      {
        wrapper: ({ children }) => (
          <RepoSearchProvider>{children}</RepoSearchProvider>
        )
      }
    );
    expect(result.current.state.searchTerm).toBe("");

    act(() =>
      result.current.dispatch({ type: "SET_SEARCH_TERM", payload: "search" })
    );

    expect(result.current.state.searchTerm).toBe("search");
  });

  test("FETCH_START action changes isFetching", () => {
    const { result } = renderHook(
      () => ({
        state: useRepoSearchState(),
        dispatch: useRepoSearchDispatch()
      }),
      {
        wrapper: ({ children }) => (
          <RepoSearchProvider>{children}</RepoSearchProvider>
        )
      }
    );
    expect(result.current.state.isFetching).toBe(false);

    act(() => result.current.dispatch({ type: "FETCH_START" }));

    expect(result.current.state.isFetching).toBe(true);
  });

  test("FETCH_SUCCESS action changes state", () => {
    const { result } = renderHook(
      () => ({
        state: useRepoSearchState(),
        dispatch: useRepoSearchDispatch()
      }),
      {
        wrapper: ({ children }) => (
          <RepoSearchProvider>{children}</RepoSearchProvider>
        )
      }
    );
    expect(result.current.state.isFetching).toBe(false);

    act(() =>
      result.current.dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          items: [{ test: "test" }],
          totalCount: 1
        }
      })
    );

    expect(result.current.state.isFetching).toBe(false);
    expect(result.current.state.items).toStrictEqual([{ test: "test" }]);
    expect(result.current.state.totalCount).toBe(1);
  });

  test("FETCH_FAILURE action changes error", () => {
    const { result } = renderHook(
      () => ({
        state: useRepoSearchState(),
        dispatch: useRepoSearchDispatch()
      }),
      {
        wrapper: ({ children }) => (
          <RepoSearchProvider>{children}</RepoSearchProvider>
        )
      }
    );
    expect(result.current.state.error).toBe(false);

    act(() => result.current.dispatch({ type: "FETCH_FAILURE" }));

    expect(result.current.state.error).toBe(true);
  });

  test("SET_LIMIT action changes state", () => {
    const { result } = renderHook(
      () => ({
        state: useRepoSearchState(),
        dispatch: useRepoSearchDispatch()
      }),
      {
        wrapper: ({ children }) => (
          <RepoSearchProvider>{children}</RepoSearchProvider>
        )
      }
    );
    expect(result.current.state.resultLimit).toBe(20);

    act(() =>
      result.current.dispatch({
        type: "SET_LIMIT",
        payload: 100
      })
    );

    expect(result.current.state.resultLimit).toBe(100);
  });
});
