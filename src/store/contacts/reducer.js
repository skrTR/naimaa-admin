import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user._id.toString() === action.payload._id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => user._id.toString() !== action.payload._id.toString()
        ),
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
