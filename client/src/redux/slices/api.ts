import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { compilerStateType } from "./compilerSlice"

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    saveCode: builder.mutation<{ url: string, message: string }, compilerStateType["fullCode"]>({
      query: (fullCode) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode
        }
      }
    }),

    loadCode: builder.mutation<{ fullCode: compilerStateType["fullCode"] }, { urlId: string }>({
      query: (body) => ({
        url: "/compiler/load",
        method: "POST",
        body: body
      })
    }),

    loginuser: builder.mutation<userInfoType, userCredentialType>({
      query: (body) => ({
          url: "/user/login",
          method: "POST",
          body: body,
          credentials: "include"
      })
    }),

    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST"
      })
    })
  })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginuserMutation, useLogoutUserMutation } = api