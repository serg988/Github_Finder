import React, { useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import { Link, withRouter } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";
import { getUserAndRepos } from "../../context/actions";
import { GET_USER_AND_REPOS, SET_LOADING } from "../../context/types";

const User = ({ match :{params} }) => {
     const {
       user: {
         name,
         avatar_url,
         location,
         bio,
         login,
         html_url,
         followers,
         following,
         public_gists,
         public_repos,
         hireable,
         blog,
         company,
       },
       loading,
       dispatch,
       repos,
  } = useContext(GithubContext);
  
  useEffect(() => {
    dispatch({ type: SET_LOADING })
    getUserAndRepos(params.login).then(res =>
      dispatch({ type: GET_USER_AND_REPOS, payload: res })
    )
    }, [dispatch, params.login]);
 
  
  console.log(blog);

  if (loading) return <Spinner />;
  return (
    <>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className='fas fa-check text-success'></i>
      ) : (
        <i className='fas fa-times-circle text-danger'></i>
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          {bio && (
            <>
              <>
                <h3>Bio:</h3>
              </>{" "}
              {bio}
            </>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Login: </strong>
                  {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong>
                  {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website: </strong>
                  <a href={blog}>{blog}</a>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos />
    </>
  );
};

export default withRouter(User);
