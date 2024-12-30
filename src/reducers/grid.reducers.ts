// Define initial state for the reducer
export const initialState = {
  data: [],
  loading: true,
  currentPage: 0,
  totalPages: 0,
  totalRecords: 0,
};

// Define action types
export const actionTypes = {
  SET_DATA: "SET_DATA",
  SET_LOADING: "SET_LOADING",
  SET_PAGE: "SET_PAGE",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES",
};

// Reducer function to handle state changes
export const gridReducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return { ...state, data: action.payload.data, loading: false };
    case actionTypes.SET_LOADING:
      return { ...state, loading: true };
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
};
