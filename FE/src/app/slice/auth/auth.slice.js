import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    token: null,
    role: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.username = user.name;
      state.token = token;
      state.role = user.role;
      state.isAuthenticated = false
    },
    logOut: (state, action) => {
      state.username = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false
    },
    setUserInfo: (state, action) => {
      state.username = action.payload.name;
      state.role = action.payload.role;
      state.isAuthenticated = true
    }
  },
});

export const { setCredentials, logOut, setUserInfo } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
