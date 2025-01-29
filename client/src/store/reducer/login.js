import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Function to refresh access token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    const response = await axios.post("http://localhost:4000/auth/refresh-token", { refreshToken });
    const { accessToken } = response.data;
    localStorage.setItem("token", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
};

// Axios interceptor to handle expired access tokens
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 403) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", { email, password });
    const { user, accessToken, refreshToken } = response.data;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return { user, accessToken };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token available");

    const response = await axios.get("http://localhost:4000/auth/current-user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch user");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
