import { configureStore, createSlice } from "@reduxjs/toolkit";
import globalValueSlice from "../redux/slices/globalValueSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    globalValue: globalValueSlice,
  },
});
