export interface Diary {
    title: string
    text: string
    priv: boolean
    user: {
        username: string,
        id: string
    }
    date: string
    id: string
}

export interface User {
  token: string,
  username: string
}

export interface LoginFormUser {
  username: string
  password: string
}