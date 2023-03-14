import axios from "axios";

export const addTaskModalToggle = (val, id, taskId) => async (dispatch) => {
  try {
    dispatch({ type: "toggleAddTaskModal", payload: { val, id, taskId } });
  } catch (e) {
    console.log("error");
  }
};

export const addTaskAct = (val) => async (dispatch) => {
  try {
    dispatch({ type: "addTaskRequest" });
    const { data } = await axios.post("/api/v1/tasks", val);
    dispatch({ type: "addTaskSuccess", payload: data });
  } catch (e) {
    dispatch({ type: "addTaskFail", payload: e.message });
  }
};

export const updateTask = (id, obj) => async (dispatch) => {
  try {
    dispatch({ type: "apiInit" });
    console.log(obj);
    const { data } = await axios.put(`/api/v1/tasks/${id}`, obj);
    dispatch({ type: "taskUpdateOk", payload: data });
  } catch (e) {
    dispatch({ type: "apiFail", payload: e.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteTaskInit" });
    const { data } = await axios.delete(`/api/v1/tasks/${id}`);
    dispatch({ type: "deleteTaskOk", payload: data });
  } catch (e) {
    dispatch({ type: "deleteTaskFail", payload: "" });
  }
};

export const moveTask = (id, action, oldBuck) => async (dispatch) => {
  try {
    dispatch({ type: "moveTaskInit" });
    const { data } = await axios.post(`/api/v1/tasks/${id}`, {
      oldBuck,
      action,
    });
    dispatch({ type: "moveTaskOk", payload: data });
  } catch (e) {
    dispatch({ type: "moveTaskFail", payload: e.message });
  }
};

export const getTaskDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "apiInit" });
    const { data } = await axios.get(`/api/v1/tasks/${id}`);
    dispatch({ type: "taksDetailsOk", payload: data });
  } catch (e) {
    dispatch({ type: "apiFail", payload: e.message });
  }
};
