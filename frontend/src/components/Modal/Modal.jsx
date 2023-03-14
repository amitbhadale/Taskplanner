import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuckets } from "../../Action/Buckes";
import {
  addTaskAct,
  addTaskModalToggle,
  getTaskDetails,
  updateTask,
} from "../../Action/Tasks";
import { listUsers } from "../../Action/Users";
import "./Modal.scss";

const Modal = () => {
  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const dispatch = useDispatch();
  const { bucketNow, taskNow } = useSelector((state) => state.modalState);
  const { task } = useSelector((state) => state.task);
  const [caption, setCaption] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState(3);
  const [assignedTo, setAssignedTo] = useState("");
  const { user } = useSelector((state) => state.user);
  const userArr = user ? user.users : null;

  useEffect(async () => {
    if (taskNow) {
      await dispatch(getTaskDetails(taskNow));
    }
  }, [taskNow]);

  useEffect(() => {
    if (task) {
      const { task: tsk } = task;
      const { caption, assignedTo, notes, priority, startDate, dueDate } = tsk;
      setCaption(caption);
      if (assignedTo) {
        setAssignedTo(assignedTo);
      }
      setNotes(notes);
      if (priority) {
        setPriority(priority);
      }
      setStartDate(startDate.substring(0, 10));
      setDueDate(dueDate.substring(0, 10));
    }
  }, [task]);

  const addTask = async (e) => {
    e.preventDefault();
    const taskObj = {
      caption,
      startDate: startDate ? startDate : Date.now(),
      dueDate: dueDate ? dueDate : Date.now() + 6 * 24 * 60 * 60 * 1000,
      notes,
      priority: parseInt(priority),
      bucket: bucketNow,
    };
    taskObj.assignedTo = assignedTo || null;

    if (taskNow) {
      await dispatch(updateTask(taskNow, taskObj));
    } else {
      await dispatch(addTaskAct(taskObj));
    }
    dispatch(getBuckets());
    setCaption("");
    setStartDate("");
    setDueDate("");
    setNotes("");
    setAssignedTo("");
    setPriority(3);
    dispatch(addTaskModalToggle(false));
  };
  return (
    <div>
      <div className="add-modal">
        <form onSubmit={addTask}>
          <input
            id="capt"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="caption"
            maxLength={75}
          />
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            name="start Date"
            title="Start Date"
          />
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            name="end date"
            title="Due Date"
          />
          <select
            title="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="3">Low</option>
            <option value="2">Medium</option>
            <option value="1">High</option>
          </select>
          <select
            title="Assigned To"
            name="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">--select--</option>
            {userArr && userArr.length > 0
              ? userArr.map((i) => {
                  return (
                    <option
                      value={i._id}
                      key={i._id}
                    >{`${i.firstName} ${i.lastName}`}</option>
                  );
                })
              : null}
          </select>
          <textarea
            title="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            name="Notes"
            cols="30"
            rows="2"
          ></textarea>
          <div className="actions">
            <button onClick={() => dispatch(addTaskModalToggle(false))}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
