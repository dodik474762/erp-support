// Define initial state for the reducer
export const initialState = {
  data: [],
  loading: true,
  currentPage: 0,
  totalPages: 0,
  totalRecords: 0,
  totalData: 0,
};

// Define action types
export const actionTypes = {
  SET_DATA: "SET_DATA",
  SET_LOADING: "SET_LOADING",
  SET_PAGE: "SET_PAGE",
  SET_TOTAL_PAGES: "SET_TOTAL_PAGES",
  SET_TOTAL_DATA: "SET_TOTAL_DATA",
  SET_TOTAL_RECORDS: "SET_TOTAL_RECORDS",
  SET_FIRST_RECORDS: "SET_FIRST_RECORDS"
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
    case actionTypes.SET_TOTAL_DATA:
      return { ...state, totalData: action.payload };
    case actionTypes.SET_TOTAL_RECORDS:
      return { ...state, totalRecords: ((state.currentPage+1) * action.payload) < state.totalData ? ((state.currentPage+1) * action.payload) : state.totalData };
    default:
      return state;
  }
};
