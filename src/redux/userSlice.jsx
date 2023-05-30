import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const authSlice = createSlice({
  name: "userAuth",
  initialState: {
    isLoggin: false,
    user: [],
    loading: false,
    error: null,
  },
//   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoggin = false;
        state.data = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggin = true;
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggin = false;
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const registerUser = createAsyncThunk(
  "registeruser",
  async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/register`,
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export default authSlice.reducer;
