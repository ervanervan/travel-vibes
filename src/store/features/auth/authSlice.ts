import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  getUserData as apiGetUserData,
} from "../../../services/authService";

interface AuthState {
  user: {
    username: string;
    email: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Thunk untuk Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { identifier, password }: { identifier: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await apiLoginUser(identifier, password);
      return data; // Mengembalikan data token dan user
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk untuk Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      username,
      password,
    }: { email: string; username: string; password: string },
    thunkAPI
  ) => {
    try {
      const data = await apiRegisterUser(email, username, password);
      return data; // Mengembalikan data token dan user
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk untuk Fetch User Data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (token: string, thunkAPI) => {
    try {
      const data = await apiGetUserData(token);
      return data; // Mengembalikan data pengguna
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            jwt: string;
            user: { username: string; email: string };
          }>
        ) => {
          state.loading = false;
          state.token = action.payload.jwt;
          state.user = action.payload.user;
          localStorage.setItem("token", action.payload.jwt);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            jwt: string;
            user: { username: string; email: string };
          }>
        ) => {
          state.loading = false;
          state.token = action.payload.jwt;
          state.user = action.payload.user;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch User Data
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<{ username: string; email: string }>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
