export interface User {
  username: string
  password: string
  code?: string
}

export interface UserStore {
  user: User
  uuid?: string
  token?: string
}

export const getUserDefaultSettings = (): UserStore => {
  return {
    user: {
      username: '',
      password: ''
    }
  }
}
