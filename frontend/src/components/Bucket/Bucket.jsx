import React from "react";
import Task from "../Task/Task";
import "./Bucket.scss";
import { useDispatch } from "react-redux";
import { addTaskModalToggle } from "../../Action/Tasks";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { deleteBucket, getBuckets } from "../../Action/Buckes";
const Bucket = ({ bucket }) => {
  const dispatch = useDispatch();
  const { name, tasks, _id } = bucket;

  const dltBucketHandler = async () => {
    if (window.confirm("Do you want to delete Bucket?")) {
      await dispatch(deleteBucket(_id));
      dispatch(getBuckets());
    }
  };
  return (
    <div className="bucket">
      <div className="bucket-head">
        <h4>{name}</h4>
        <PlaylistAddIcon
          className="ico"
          onClick={() => dispatch(addTaskModalToggle(true, _id))}
        />
      </div>
      <div className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            return <Task task={task} key={task._id} bucketId={_id} />;
          })
        ) : (
          <>
            <p>No tasks</p>
            <DeleteIcon onClick={() => dltBucketHandler()} className="ico" />
          </>
        )}
      </div>
    </div>
  );
};

export default Bucket;
