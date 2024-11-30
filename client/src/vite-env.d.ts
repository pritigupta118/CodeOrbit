/// <reference types="vite/client" />

interface userInfoType {
  username: string,
  picture: string,
  email: string,
  savedCodes: string[]
}

interface loginCredentialType{
  userId: string,
  password: string
}

interface signupCredentialType{
  username: string,
  email: string,
  password: string
}