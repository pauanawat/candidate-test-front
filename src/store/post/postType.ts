import { IUser } from "../type"

export interface IPost {
  id: number
  userId: number
  title: string
  body: string
  createAt: string
  updateAt: string
}
export interface IPostFilter {
  id?: number
  userId?: number
  title?: string
  body?: string
}
export interface IPostUpdate {
  title: string
  body: string
}

export interface IPostCreate {
  userId: number
  title: string
  body: string
}

export interface IFeed extends IPost {
  author: IUser
}