import { all, fork } from "redux-saga/effects"

//public
import contactsSaga from "./contacts/saga"
import categorysSaga from "./category/saga"
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"
import transactionSaga from "./transaction/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(contactsSaga),
    fork(categorysSaga),
    fork(transactionSaga),
  ])
}
