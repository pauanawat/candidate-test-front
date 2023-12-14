import Axios, { AxiosRequestConfig } from 'axios'
import { config } from '../const/config'
import { localName } from '../const/constant'

const baseURL: string = config.API_URL
const basic: string = config.BASIC_API

export const authApi = Axios.create({
  baseURL: baseURL,
  timeout: 30 * 1000
})

export const basicApi = Axios.create({
  baseURL: baseURL,
  timeout: 10 * 1000,
  headers: {
    Authorization: 'Basic ' + basic
  }
})

authApi.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(localName.ACCESSTOKEN)
  console.log("token:",token)
  if (!!token) {
    config.headers = { Authorization: 'Bearer ' + token }
  }
  return config
})
