import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const registerUser = createAsyncThunk("auth/signup", async(userData, thunkAPI) => {
   try {
      const response = await axios.post(`/api/v1/users/signup`, userData)
      if(response.data){
         return response.data
      }

   } catch (err) {
      const message = (err.response && err.response.data.message) || err.message

      //rejectWithValue sends the error message as a payload
      return thunkAPI.rejectWithValue(message)
   }
})