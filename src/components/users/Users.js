import React, { useContext, useEffect } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";
import classes from "./Users.module.css";


const Users = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { users, loading, text } = githubContext;

  let output = null;
  useEffect(() => {
    if (users.length === 0 && text) {
      alertContext.setAlert(`User "${text}" not found`, "custom");
    }
    //eslint-disable-next-line
  }, [users]);
  
    if (loading) {
      output = <Spinner />;
    }  else {
      output = (
        <div className={classes.userStyle}>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      );
    }
  return output;
};

export default Users;
