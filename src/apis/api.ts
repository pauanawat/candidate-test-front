import {
  authApi,
  basicApi,
} from './axios'
import { IUserFilter, UpdateUserType } from '../store/user/userType'
import { IPostCreate, IPostFilter, IPostUpdate } from '../store/post/postType'

export const auth = {
  login: (
    username: string,
    password: string
  ) =>
    basicApi.post('/login', {
      username, password
    }),
}
export const user = {
  createUser: (data: UpdateUserType) =>
    authApi.post('/users', data),
  updateUser: (id: number, data: UpdateUserType) =>
    authApi.put(`/users/${id}`, data),
  patchUser: (id: number, data: UpdateUserType) =>
    // update some field
    authApi.patch(`/users/${id}`, data),
  deleteUser: (id: number) =>
    authApi.delete(`/users/${id}`),
  getUserById: (id: number) =>
    authApi.get(`/users/${id}`),
  getAllUser: () => {
    return basicApi.get('/users/all')
  },
  getUser: (data: IUserFilter) => {
    let query = "?"
    query = data.id ? query + "id=" + data.id.toString() : query
    query = query.length && data.email ? query + "&" : query
    query = data.email ? query + "email=" + data.email : query
    query = query.length && data.name ? query + "&" : query
    query = data.name ? query + "name=" + data.name : query
    query = query.length && data.phone ? query + "&" : query
    query = data.phone ? query + "phone=" + data.phone : query
    if (query.length == 1) query = ""
    console.log(query)
    return authApi.get('/users' + query)
  },
}
export const post = {
  createPost: (data: IPostCreate) =>
    authApi.post('/posts', data),
  updatePost: (id: number, data: IPostUpdate) =>
    authApi.put(`/posts/${id}`, data),
  patchPost: (id: number, data: IPostUpdate) =>
    // update some field
    authApi.patch(`/posts/${id}`, data),
  deletePost: (id: number) =>
    authApi.delete(`/posts/${id}`),
  getPostById: (id: number) =>
    authApi.get(`/posts/${id}`),
  getPost: (data: IPostFilter) => {
    let query = "?"
    query = data.id ? query + "id=" + data.id : query
    query = query.length && data.userId ? query + "&" : query
    query = data.userId ? query + "userId=" + data.userId : query
    query = query.length && data.title ? query + "&" : query
    query = data.title ? query + "title=" + data.title : query
    query = query.length && data.body ? query + "&" : query
    query = data.body ? query + "body=" + data.body : query
    if (query.length == 1) query = ""
    console.log(query)
    return authApi.get('/posts' + query)
  },
}
export const feed = {
  getFeedList: (userId?: number) => {
    let query = userId ? "?userId=" + userId : ""
    return basicApi.get('/feeds' + query)
  }
}