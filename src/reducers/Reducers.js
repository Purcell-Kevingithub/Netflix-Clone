// init state
export const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};
  
export const initComedy = {
  loading: true,
  movies: [],
  errorMessage: null
};
  

export const inithm = {
  loading: true,
  movies: [],
  errorMessage: null
};

export const initDetail = {
  loading: true,
  details: [],
  errorMessage: null
};

export const initSearch = {
  loading: true,
  search: [],
  errorMessage: null
};
  
  // Reducer updates state based on switch case. Movies_Request updates state for loading, Movies_Success updates movies aray with data, and
  // Movies_Failure updates errorMessage.
 export const movieReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "SEARCH_MOVIES_SUCCESS":
        return {
          ...state,
          loading: false,
          movies: action.payload
        };
      case "SEARCH_MOVIES_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
  };
  
export const comedyReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};


  export const hmReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "SEARCH_MOVIES_SUCCESS":
        return {
          ...state,
          loading: false,
          movies: action.payload
        };
      case "SEARCH_MOVIES_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
  };

  export const movieDetailReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_DETAILS_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "SEARCH_DETAILS_SUCCESS":
        return {
          ...state,
          loading: false,
          details: action.payload
        };
      case "SEARCH_DETAILS_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
  }

  export const searchReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "SEARCH_MOVIES_SUCCESS":
        return {
          ...state,
          loading: false,
          search: action.payload
        };
      case "SEARCH_MOVIES_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
  };