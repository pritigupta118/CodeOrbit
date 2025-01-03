import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { compilerStateType } from "./compilerSlice"

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://code-orbit.onrender.com",
    credentials: "include"
  }),
  tagTypes: ["my-codes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation<{ url: string, message: string }, codeType>({
      query: (fullCode) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode
        }
      },
      invalidatesTags: ["my-codes"], 
    }),

    loadCode: builder.mutation<{ fullCode: compilerStateType["fullCode"] }, { urlId: string }>({
      query: (body) => ({
        url: "/compiler/load",
        method: "POST",
        body: body
      })
    }),

    signupUser: builder.mutation<userInfoType,signupCredentialType>({
      query: (body) => ({
         url: "/user/signup",
         method: "POST",
         body: body
      })
    }),

    loginuser: builder.mutation<userInfoType, loginCredentialType>({
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
    }),

    getUserDetails: builder.query<userInfoType, void>({
      query: () => ({url: "/user/user-details", cache: "no-store"})
    }),

    getMyCodes: builder.query<Array<codeType>, void>({
      query: () => "/user/my-codes",
      providesTags: ["my-codes"]
    }),

    deleteCode: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/compiler/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["my-codes"]
    })

  })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginuserMutation, useLogoutUserMutation, useGetUserDetailsQuery, useSignupUserMutation, useGetMyCodesQuery, useDeleteCodeMutation } = api