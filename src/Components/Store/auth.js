import { createSlice } from "@reduxjs/toolkit";


const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");
const initialpremium = localStorage.getItem('premiumUser');
const userIsloggedin = !!initialToken;

const initialAuthState = {
  token: initialToken,
  email: initialEmail,
  isAuthenticated: userIsloggedin,
  premiumUser : initialpremium,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },

    logout(state) {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      state.premiumUser = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem('premiumUser');
    },

    premiumUser(state){
      localStorage.setItem('premiumUser', true)
      state.premiumUser=true;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
