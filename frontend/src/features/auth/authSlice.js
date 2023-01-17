import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";

//get user from the local storage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
   user: user ? user : null,
   loading: false,
   error: false,
   success: false,
   message: ""
}

export const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      reset: (state) => {
         state.loading = false
         state.success = false
         state.error = false
         state.message = false
      }
   },
   extraReducers: (builder) => {
      builder.addCase(registerUser.pending, (state) => {
         state.loading = true
      })
      .addCase(registerUser.fulfilled,(state, action) => {
         state.loading = false
         state.success = true
         state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
         state.loading = false
         state.user = null
         state.error = true
         state.message = action.payload
      })
   }
})

export const { reset } = authSlice.actions

export default authSlice.reducer