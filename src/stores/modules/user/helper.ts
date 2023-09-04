export interface User {
  email: string
  password: string
  username?: string
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
      password: '',
      email: ''
    }
  }
}
