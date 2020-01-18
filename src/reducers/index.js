export const initialRepoSearchState = {
  searchTerm: "",
  resultLimit: 5,
  currentPage: 1,
  totalCount: 0,
  items: []
};

export const repoSearchReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};
