import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isModalOpen: false,
};

export const modalReducer = createReducer(initialState, {
  toggleAddTaskModal: (state, action) => {
    state.isModalOpen = action.payload.val;
    state.bucketNow = action.payload.id;
    state.taskNow = action.payload.taskId;
  },
});

export const taskReducer = createReducer(initialState, {
  addTaskRequest: (state, action) => {
    state.loading = true;
  },
  addTaskSuccess: (state, action) => {
    state.loading = false;
    state.task = action.payload;
  },
  addTaskFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteTaskInit: (state) => {
    state.loading = true;
  },
  deleteTaskOk: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteTaskFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  moveTaskInit: (state) => {
    state.loading = true;
  },
  moveTaskOk: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  moveTaskFail: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  apiInit: (state) => {
    state.loading = true;
  },
  apiFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  taksDetailsOk: (state, action) => {
    state.loading = false;
    state.task = action.payload;
  },
});
