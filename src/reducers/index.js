export const initialRepoSearchState = {
  searchTerm: "",
  resultLimit: 5,
  currentPage: 1,
  totalCount: 0,
  items: [],
  isFetching: false,
  error: false
};

export const repoSearchReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_START":
      return {
        ...state,
        isFetching: true,
        error: false,
        items: [],
        currentPage: 1,
        totalCount: 0
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isFetching: false,
        searchTerm: payload.searchTerm,
        items: payload.items,
        totalCount: payload.totalCount
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case "SET_LIMIT":
      return {
        ...state,
        resultLimit: payload
      };
    default:
      return state;
  }
};
