import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id_user: undefined,
      nom: "",
      prenom: "",
      mail: "",
      path_img: "",
      type: "",
    },
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {},
  },
});

export const { getUser, logout } = authSlice.actions;
export default authSlice.reducer;
