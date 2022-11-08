import axios from "axios"
//pass new generated access token here
const obj = JSON.parse(localStorage.getItem("amazon-token"))
const token = `Bearer ${obj}`
//apply base url for axios
const API_URL = "https://naimaaserver.com/api/v1"
// const API_URL = "http://159.223.82.71/api/v1"

// https://novelistgroup.com
const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config }, { token })
    .then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config }, { token })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config }, { token })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config }, { token })
    .then(response => response.data)
}
