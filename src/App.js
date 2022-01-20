import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";
const App = () => {
  const [userName, setUserName] = useState("");
  const [githubUsers, setGithubUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getGithubUsers = async () => {
      setLoading(true);

      await axios
        .get(
          `https://api.github.com/search/users?q=${userName}&page=1&per_page=100`,
          {
            headers: {
              Authorization: "token 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",
            },
          }
        )
        .then((response) => {
          setGithubUsers(response.data.items);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    userName !== "" && getGithubUsers();
  }, [userName]);
  const onChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="container">
      <h1>Github User Finder</h1>
      <div className="search-outer">
        <div className="search-box">
          <input
            type="text"
            value={userName}
            onChange={(e) => onChange(e)}
            className="search-text"
            placeholder="Search for a github user..."
          />
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="github-users">
        {userName &&
          githubUsers.length > 0 &&
          githubUsers.map((user, index) => (
            <div key={index} className="github-user">
              <img src={user.avatar_url} />
              <span className="userName">{user.login}</span>
              <Link className="repos-btn" to={`/repos/${user.login}`}>
                See Public Repos
              </Link>
            </div>
          ))}
      </div>
      {loading && <div className="loading">Loading...</div>}

      {userName && githubUsers.length === 0 && (
        <span className="no-user"> No Github Users found</span>
      )}
    </div>
  );
};

export default App;
