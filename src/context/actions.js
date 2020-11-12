import axios from "axios";

let githubClientToken;
if (process.env.NODE_ENV !== 'production') {
  githubClientToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  githubClientToken = process.env.GITHUB_TOKEN;
}

const github = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 3000,
  headers: { Authorization: githubClientToken }
})

export const searchUsers = async (text) => {
  const res = await github.get(`/search/users?q=${text}`);
  return res.data.items;
};

export const getUserAndRepos = async (username) => {
  const repos = await github.get(
    `/users/${username}/repos?per_page=5&sort=created:asc?`
  );
  const user = await github.get(`/users/${username}?`);
  return { user: user.data, repos: repos.data };
};