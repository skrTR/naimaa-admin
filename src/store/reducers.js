import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

//хэрэглэгчид
import contacts from "./contacts/reducer"

// Сургууль
import categorys from "./category/reducer"
// Сургууль
import transactions from "./transaction/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  contacts,
  categorys,
  transactions,
})

export default rootReducer
