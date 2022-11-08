import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_DETAIL,
  GET_TRANSACTION_DETAIL_SUCCESS,
  GET_TRANSACTION_DETAIL_FAIL,
} from "./actionTypes"

export const getTransactions = () => ({
  type: GET_TRANSACTIONS,
})

export const getTransactionsSuccess = transactions => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: transactions,
})

export const getTransactionsFail = error => ({
  type: GET_TRANSACTIONS_FAIL,
  payload: error,
})
export const getTransactionDetail = billId => ({
  type: GET_TRANSACTION_DETAIL,
  billId,
})

export const getTransactionDetailSuccess = transactions => ({
  type: GET_TRANSACTION_DETAIL_SUCCESS,
  payload: transactions,
})

export const getTransactionDetailFail = error => ({
  type: GET_TRANSACTION_DETAIL_FAIL,
  payload: error,
})
