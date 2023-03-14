import { configureStore } from "@reduxjs/toolkit";
import { bucketReducer } from "./Reducer/Bucket";
import { modalReducer, taskReducer } from "./Reducer/Tasks";
import { userReducer } from "./Reducer/Users";

const store = configureStore({
  reducer: {
    bucketList: bucketReducer,
    modalState: modalReducer,
    task: taskReducer,
    user: userReducer,
  },
});

export default store;
