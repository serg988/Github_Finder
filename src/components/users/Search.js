import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import { searchUsers } from "../../context/actions";
import AlertContext from "../../context/alert/alertContext";
import {
  SEARCH_USERS,
  SET_TEXT,
  SET_LOADING,
  CLEAR_USERS,
} from "../../context/types";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [input, setInput] = useState("");
  const { dispatch, users } = githubContext;

  const onChangeHandler = (e) => setInput(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input === "") {
      alertContext.setAlert("Please enter something", "primary");
    } else {
      dispatch({ type: SET_LOADING });
      dispatch({ type: SET_TEXT, payload: input });
      searchUsers(input).then((users) => {
        dispatch({ type: SEARCH_USERS, payload: users });
      });
      setInput("");
    }
  };

  return (
    <div>
      <form className='search' onSubmit={onSubmitHandler}>
        <input
          type='text'
          name='text'
          placeholder='Search Users'
          value={input}
          onChange={onChangeHandler}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={() => dispatch({ type: CLEAR_USERS })}
        >
          Clear Search
        </button>
      )}
    </div>
  );
};

export default Search;
