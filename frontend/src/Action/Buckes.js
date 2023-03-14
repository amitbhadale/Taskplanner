import axios from "axios";

export const getBuckets = () => async (dispatch) => {
  try {
    dispatch({ type: "apiInit" });
    const { data } = await axios.get("/api/v1/bucket");
    dispatch({ type: "getBucketsSuccess", payload: data });
  } catch (e) {
    dispatch({
      type: "apiFail",
      payload: e.message,
    });
  }
};

export const addBucket = (name) => async (dispatch) => {
  try {
    dispatch({ type: "apiInit" });
    const { data } = await axios.post("/api/v1/bucket", { name });
    dispatch({ type: "addBucketOk", payload: data });
  } catch (e) {
    dispatch({ type: "apiFail", payload: e.message });
  }
};

export const deleteBucket = (id) => async (dispatch) => {
  try {
    dispatch({ type: "apiInit" });
    const { data } = await axios.delete(`/api/v1/bucket/${id}`);
    dispatch({ type: "updateMsg", payload: data });
  } catch (e) {
    dispatch({ type: "apiFail", payload: e.message });
  }
};
