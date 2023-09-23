import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../axiosConfig';


export const registerUser = createAsyncThunk(
  "registeruser",
  async (userData) => {
    try {
      const response = await axiosInstance.post(
        `/api/user/register`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



export const userLogin = createAsyncThunk("userlogin",
async (userData)=> {
  try {
    const response = await axiosInstance.post(
      `/api/user/login`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
);

export const authSlice = createSlice({
  name: "userAuth",
  initialState: {
    isLoggin: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggin = false;
      state.user= null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoggin = false;
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggin = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggin = false;
        state.user = null;
        state.loading = false;
        state.error = action.error.message;
      })
      // login
      .addCase(userLogin.pending, (state) => {
        state.isLoggin = false;
        state.user = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoggin = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoggin = false;
        state.user = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
