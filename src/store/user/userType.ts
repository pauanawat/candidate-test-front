const GET_USER = 'GET_USER'

interface GetUserAction {
  type: typeof GET_USER
}

export interface IAccount {
  username: string
  password?: string
}

export interface IUser {
  id: number
  email: string
  name: string
  phone: string
  website: string
  address: IAddress
  company: ICompany
}
export interface IUserUpdate {
  email: string
  name: string
  phone: string
  website: string
  address: IAddress
  company: ICompany
}

export interface IAddress {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: IGeo
}
export interface IGeo {
  lat: string
  lng: string
}
export interface ICompany {
  name: string
  catchPhrase: string
  bs: string
}
export interface IUserFilter {
  id?: number
  name?: string
  email?: string
  phone?: string
}

export type UserType = IUser & IAccount
export type UpdateUserType = IUserUpdate & IAccount

