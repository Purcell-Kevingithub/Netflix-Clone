function createInitialState() {
  return {
    loading: true,
    movies: [],
    errorMessage: null,
  }
}

// initialize genre states
export const initialState = createInitialState();
export const initComedy = createInitialState();
export const inithm = createInitialState();
export const initDocumentary = createInitialState();
export const initRomance = createInitialState();
export const initScifi = createInitialState();
export const initDetail = createInitialState();
export const initSearch = createInitialState();


// Reducer updates state based on switch case which covers inital request, success, and failure.
export function genreReducer(state, action) {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
}

export const detailsReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        details: action.payload,
      };
    case "SEARCH_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

