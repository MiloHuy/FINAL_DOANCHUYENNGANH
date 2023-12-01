import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    token: null,
    role: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.username = user.name;
      state.token = token;
      state.role = user.role;
    },
    logOut: (state, action) => {
      state.username = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
