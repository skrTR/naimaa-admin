import { call, put, takeEvery } from "redux-saga/effects"

import { toast } from "react-toastify"
// Crypto Redux States
import {
  GET_CATEGORYS,
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "./actionTypes"

import {
  getCategorysSuccess,
  getCategorysFail,
  addCategoryFail,
  addCategorySuccess,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategorySuccess,
  deleteCategoryFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCategorys,
  addNewCategory,
  updateCategory,
  deleteCategory,
} from "../../helpers/fakebackend_helper"

function* fetchCategorys() {
  try {
    const response = yield call(getCategorys)
    yield put(getCategorysSuccess(response.data))
  } catch (error) {
    yield put(getCategorysFail(error))
  }
}

function* onUpdateCategory({ payload: category }) {
  try {
    const response = yield call(updateCategory, category)
    yield put(updateCategorySuccess(response.data))
    toast.success("Амжиллтай өөрчиллөө", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(updateCategoryFail(error))
    let message = error.response.data.error.message
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
}

function* onDeleteCategory({ payload: category }) {
  try {
    const response = yield call(deleteCategory, category)
    yield put(deleteCategorySuccess(response.data))
    toast.success("Амжиллтай устгалаа", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(deleteCategoryFail(error))
    let message = error.response.data.error.message
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
}

function* onAddNewCategory({ payload: category }) {
  try {
    const response = yield call(addNewCategory, category)
    yield put(addCategorySuccess(response.data))
    toast.success("Амжиллтай нэмлээ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(addCategoryFail(error))
    let message = error.response.data.error.message
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
}

function* contactsSaga() {
  yield takeEvery(GET_CATEGORYS, fetchCategorys)

  yield takeEvery(ADD_NEW_CATEGORY, onAddNewCategory)
  yield takeEvery(UPDATE_CATEGORY, onUpdateCategory)
  yield takeEvery(DELETE_CATEGORY, onDeleteCategory)
}

export default contactsSaga
