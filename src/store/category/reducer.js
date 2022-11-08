import {
  GET_CATEGORYS_SUCCESS,
  GET_CATEGORYS_FAIL,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  categorys: [],
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORYS_SUCCESS:
      return {
        ...state,
        categorys: action.payload,
      }

    case GET_CATEGORYS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categorys: [...state.categorys, action.payload],
      }

    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categorys: state.categorys.map(category =>
          category.id.toString() === action.payload.id.toString()
            ? { category, ...action.payload }
            : category
        ),
      }

    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categorys: state.categorys.filter(
          category => category.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
