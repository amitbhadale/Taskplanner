import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const bucketReducer = createReducer(initialState, {
  apiInit: (state) => {
    state.loading = true;
  },
  apiFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updateMsg: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  getBucketsSuccess: (state, action) => {
    state.loading = false;
    state.buckets = action.payload;
  },
  addBucketOk: (state, action) => {
    state.loading = false;
    state.buckets = action.payload;
  },
});
