export const initialRepoSearchState = {
  searchTerm: "rainbow",
  resultLimit: 20,
  currentPage: 1,
  totalCount: 0,
  items: [],
  isFetching: false,
  error: false
};

export const repoSearchReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: payload
      };
    case "FETCH_START":
      return {
        ...state,
        isFetching: true,
        error: false,
        items: [],
        totalCount: 0
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isFetching: false,
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
    case "SET_PAGE":
      return {
        ...state,
        currentPage: payload
      };
    default:
      return state;
  }
};
