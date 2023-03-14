import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deletUser, listUsers } from "../../Action/Users";

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const { loading, user } = useSelector((state) => state.user);
  const userArr = user ? user.users : null;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const addUserHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      addUser({
        firstName,
        lastName,
      })
    );
    setFirstName("");
    setLastName("");
    dispatch(listUsers());
  };

  const deleteUserHandle = async (id) => {
    if (window.confirm("Do you want to delete user?")) {
      await dispatch(deletUser(id));
      dispatch(listUsers());
    }
  };
  return (
    <div className="user-form">
      <h3>add User</h3>
      <form onSubmit={addUserHandler}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          maxLength="10"
          onChange={(e) => {
            setFirstName(e.target.value.trim());
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          maxLength="10"
          value={lastName}
          onChange={(e) => setLastName(e.target.value.trim())}
        />
        <button type="submit">Add</button>
      </form>

      <div className="user-list">
        <ul>
          {userArr && userArr.length > 0 ? (
            userArr.map((i) => {
              return (
                <li key={i._id}>
                  <button onClick={() => deleteUserHandle(i._id)}>
                    Delete
                  </button>{" "}
                  {i.firstName} {i.lastName}
                </li>
              );
            })
          ) : (
            <p>No user</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default User;
