import axios from "axios";

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "listUserRequest" });
    const { data } = await axios.get("/api/v1/user");
    dispatch({ type: "listUserSuccess", payload: data });
  } catch (e) {
    dispatch({ type: "listUserFail", payload: e.message });
  }
};

export const addUser = (userObj) => async (dispatch) => {
  try {
    dispatch({ type: "addUserInit" });
    const { data } = await axios.post("/api/v1/user", userObj);
    console.log("data", data);
    dispatch({ type: "addUserOk", payload: "User Added" });
  } catch (e) {
    dispatch({ type: "addUserFail", payload: e.message });
  }
};

export const deletUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserInit" });
    const { data } = await axios.delete(`/api/v1/user/${id}`);
    dispatch({ type: "deleteUserOk", payload: "User deleted" });
  } catch (e) {
    dispatch({ type: "deleteUserFail", payload: e.message });
  }
};
