import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authActions";

const initialState = {
   user: null,
   loading: false,
   error: false,
   success: false,
   message: ""
}

export const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {},
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

export default authSlice.reducer