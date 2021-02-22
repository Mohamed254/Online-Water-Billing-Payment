import {
  USER_LOADED,
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USER,
  FILTER_USERS,
  CLEAR_USERS,
  CLEAR_FILTER,
  USER_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        user: [...state.user, action.payload],
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: state.user.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        loading: false,
      };

    case DELETE_USER:
      return {
        ...state,
        user: state.user.filter(
          (user) => user._id !== action.payload
        ),
        loading: false,
      };

    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};
