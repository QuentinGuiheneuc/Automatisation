import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        user: {
            id_user: undefined,
            nom: '',
            prenom: '',
            mail: '',
            path_img: '',
            type: ''
        }
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isLogged = true
        },
        logout: (state) => {
            state.isLogged = false
        },
    },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;