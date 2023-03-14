import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {
  listUserRequest: (state) => {
    state.loading = true;
  },
  listUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  listUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  addUserInit: (state) => {
    state.loading = true;
  },
  addUserOk: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
