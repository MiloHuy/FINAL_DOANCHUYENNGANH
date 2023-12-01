import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    phone: null,
    email: null,
    degree: null,
  },
  reducers: {
    getUserInfoRedux: (state, action) => {
      const { name, phone, email, degree } = action.payload.user;

      state.name = name;
      state.phone = phone;
      state.email = email;
      state.degree = degree;
    },
  },
});

export const { getUserInfoRedux } = userSlice.actions;

export default userSlice.reducer;
