import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [input, setInput] = useState("");
  const { text, setText }  = githubContext;

  const onChangeHandler = (e) => setInput(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input === "") {
      alertContext.setAlert("Please enter something", "primary");
    } else {
      setText(input)
      githubContext.searchUsers(input);
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
          onClick={githubContext.clearUsers}
        >
          Clear Search
        </button>
      )}
    </div>
  );
};

export default Search;
