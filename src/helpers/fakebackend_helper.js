import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// get Хэрэглэгч
export const getUsers = () => get(url.GET_USERS)

// update Хэрэглэгч
export const updateUser = user => put(`${url.UPDATE_USER}/${user.id}`, user)
// delete Хэрэглэгч
export const deleteUser = user => del(`${url.DELETE_USER}/${user._id}`)

// get category
export const getCategorys = () => get(url.GET_CATEGORYS)
// add category
export const addNewCategory = category => post(url.ADD_NEW_CATEGORY, category)
// update category
export const updateCategory = category =>
  put(`${url.UPDATE_CATEGORY}/${category.id}`, category)
// delete category
export const deleteCategory = category =>
  del(`${url.DELETE_CATEGORY}/${category._id}`)

// get transaction
export const getTransactions = () => get(url.GET_TRANSACTIONS)
// get transaction Detail
export const getTransactionDetail = billId =>
  get(`${url.GET_TRANSACTION_DETAIL}=${billId}`)

export { getLoggedInUser, isUserAuthenticated, postJwtLogin }
