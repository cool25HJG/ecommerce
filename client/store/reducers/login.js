import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`http://localhost:4000/auth/login`, { email, password });
    const { user, token } = response.data;

    localStorage.setItem("token", token);

    dispatch(loginSuccess({ user, token }));
  } catch (error) {
    dispatch(
      loginFailure(error.response?.data?.message || "An error occurred during login.")
    );
  }
};

export const logoutUser = () => (dispatch) => {

  localStorage.removeItem("token");
  dispatch(logout());
};

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null, 
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
