import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Header.scss";
import { addBucket, getBuckets } from "../../Action/Buckes";

const Header = () => {
  const dispatch = useDispatch();
  const [columnName, setColumnName] = useState("");
  const addColumnHandler = async (e) => {
    e.preventDefault();
    await dispatch(addBucket(columnName));
    setColumnName("");
    dispatch(getBuckets());
  };
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/user">User</Link>
        </li>
      </ul>

      <div className="add-col">
        <form onSubmit={(e) => addColumnHandler(e)}>
          <input
            type="text"
            required
            maxLength={20}
            placeholder="Add new column..."
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
