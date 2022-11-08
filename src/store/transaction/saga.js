import { call, put, takeEvery } from "redux-saga/effects"

// Ecommerce Redux States
import { GET_TRANSACTIONS, GET_TRANSACTION_DETAIL } from "./actionTypes"
import {
  getTransactionDetailFail,
  getTransactionDetailSuccess,
  getTransactionsFail,
  getTransactionsSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getTransactionDetail,
  getTransactions,
} from "helpers/fakebackend_helper"

function* fetchTransactions() {
  try {
    const response = yield call(getTransactions)
    yield put(getTransactionsSuccess(response.data))
  } catch (error) {
    yield put(getTransactionsFail(error))
  }
}

function* fetchTransactionDetail({ billId }) {
  try {
    const response = yield call(getTransactionDetail, billId)
    yield put(getTransactionDetailSuccess(response.data))
  } catch (error) {
    yield put(getTransactionDetailFail(error))
    // let message = error.response.data.error.message
  }
}

function* transactionSaga() {
  yield takeEvery(GET_TRANSACTIONS, fetchTransactions)
  yield takeEvery(GET_TRANSACTION_DETAIL, fetchTransactionDetail)
}

export default transactionSaga
