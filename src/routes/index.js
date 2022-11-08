import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import users from "pages/Users/users"
import usersVerify from "pages/Users/usersVerify"
import categorysList from "pages/CategoryList/categorys-list"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // бүх хэрэглэгчид
  { path: "/users", component: users },
  // Хэрэглэгч баталгаажуулах
  { path: "/users-active", component: usersVerify },

  // бүх Сургууль
  { path: "/category", component: categorysList },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
