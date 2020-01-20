import React, { createContext, useContext, useReducer } from "react";

import { initialRepoSearchState, repoSearchReducer } from "../reducers";

const RepoSearchStateContext = createContext();

const RepoSearchDispatchContext = createContext();

export const RepoSearchProvider = ({
  children,
  initialState = initialRepoSearchState
}) => {
  const [state, dispatch] = useReducer(repoSearchReducer, initialState);

  return (
    <RepoSearchStateContext.Provider value={state}>
      <RepoSearchDispatchContext.Provider value={dispatch}>
        {children}
      </RepoSearchDispatchContext.Provider>
    </RepoSearchStateContext.Provider>
  );
};

export const useRepoSearchState = () => {
  const context = useContext(RepoSearchStateContext);
  if (context === undefined) {
    throw new Error(
      "useRepoSearchState must be used within a RepoSearchProvider"
    );
  }
  return context;
};

export const useRepoSearchDispatch = () => {
  const context = useContext(RepoSearchDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useRepoSearchDispatch must be used within a RepoSearchProvider"
    );
  }
  return context;
};
