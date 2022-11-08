import {
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_DETAIL_FAIL,
  GET_TRANSACTION_DETAIL_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  transactions: [],
}

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
      }

    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_TRANSACTION_DETAIL_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
      }

    case GET_TRANSACTION_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Ecommerce
