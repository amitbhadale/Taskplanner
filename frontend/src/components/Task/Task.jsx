import React from "react";
import { useDispatch } from "react-redux";
import { getBuckets } from "../../Action/Buckes";
import { deleteTask, moveTask } from "../../Action/Tasks";
import { addTaskModalToggle } from "../../Action/Tasks";
import DeleteIcon from "@mui/icons-material/Delete";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import EditIcon from "@mui/icons-material/Edit";
import "./Task.scss";

const Task = ({ task, bucketId }) => {
  const dispatch = useDispatch();
  const { caption, dueDate, priority, _id, assignedTo } = task;
  const newDue = new Date(dueDate).toDateString();

  const deleteTaskHandle = async () => {
    if (window.confirm("Do you want to delete Task?")) {
      await dispatch(deleteTask(_id));
      dispatch(getBuckets());
    }
  };
  const moveTaskHandle = async (val) => {
    await dispatch(moveTask(_id, val, bucketId));
    dispatch(getBuckets());
  };

  return (
    <div
      className="task"
      style={{
        borderColor:
          priority === 1 ? "red" : priority === 2 ? "orange" : "green",
      }}
    >
      <div className="head">
        <h5>{caption}</h5>
      </div>
      <div className="body">
        <p className="due" title="Due Date">
          {newDue}
        </p>

        {assignedTo ? (
          <p title="Assigned To">
            {assignedTo.firstName} {assignedTo.lastName}
          </p>
        ) : null}
      </div>
      <div className="base">
        <div className="move">
          <WestIcon
            title="Move to Previous"
            className="ico"
            onClick={() => moveTaskHandle("prev")}
          />
          <EastIcon
            title="Move to Next"
            className="ico"
            onClick={() => moveTaskHandle("next")}
          />
        </div>
        <div className="edlt">
          <EditIcon
            className="ico"
            onClick={() => dispatch(addTaskModalToggle(true, undefined, _id))}
          />
          <DeleteIcon
            className="dlt ico"
            onClick={() => {
              deleteTaskHandle();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
