import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { config } from '../const/config'
import { localName } from '../const/constant'

const baseURL: string = config.API_URL
const basic: string = config.BASIC_API

export const authApi: AxiosInstance = Axios.create({
  baseURL: baseURL,
  timeout: 30 * 1000
})

export const basicApi: AxiosInstance = Axios.create({
  baseURL: baseURL,
  timeout: 10 * 1000,
  headers: {
    Authorization: 'Basic ' + basic
  }
})
authApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(localName.ACCESSTOKEN);
    if (!!token) {
      config.headers.set("Authorization", 'Bearer ' + token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)
