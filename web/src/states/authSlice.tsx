import { createSlice } from "@reduxjs/toolkit";
import locsto, { localTokenGet } from "../data/localStokage";

const isLoggedV = () => {
  const t = localTokenGet();
  if (t == null) {
    return false;
  } else {
    return true;
  }
};

const tokenV = () => {
  const t = localTokenGet();
  if (t != null) {
    return t;
  } else {
    return { Bearer: "undefined" };
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: isLoggedV(),
    token: tokenV(),
  },
  reducers: {
    auth: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
      locsto(action.payload);
    },
    logout: (state) => {
      state.isLogged = false;
      locsto({});
    },
  },
});

export const { auth, logout } = authSlice.actions;
export default authSlice.reducer;
