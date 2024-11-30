import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface appSliceState {
 currentUser: {
  username?: string,
  picture?: string,
  email?: string,
  savedCodes?: string[]
 },
 isLoggedIn: boolean
}

const initialState:appSliceState = {
  currentUser: {},
  isLoggedIn: false
}

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers : {
    updateCurrentUser: (state, action: PayloadAction<appSliceState["currentUser"]>) => {
      state.currentUser = action.payload
    },

    updateIsLoggedIn: (state, action: PayloadAction<appSliceState["isLoggedIn"]>) => {
      state.isLoggedIn = action.payload
    }
  }
})

export const {updateCurrentUser, updateIsLoggedIn} = appSlice.actions

export default appSlice.reducer