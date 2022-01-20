import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Repos = () => {
  const location = useLocation();
  const userName = location.pathname.split("/")[2];
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    const getRepos = async () => {
      await axios
        .get(`https://api.github.com/users/${userName}/repos`, {
          headers: {
            Authorization: "token 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",
          },
        })
        .then((response) => {
          setRepos(response.data);

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRepos();
  }, [userName]);

  return (
    <div className="repos-container">
      <h1>Public Repositories</h1>
      {loading && <div className="loading">Loading.....</div>}

      <div className="repos-inner">
        {repos.length > 0 &&
          repos.map((repo, index) => (
            <div key={index} className="repo">
              <div className="repo-title"># {repo.name}</div>

              <div className="repo-description">
                {repo.description && repo.description}
              </div>
              <div className="repo-basic-info">
                <span>
                  <i className="fas fa-code"></i> {repo.language}
                </span>
                <span>
                  {" "}
                  <i className="far fa-star"></i> {repo.stargazers_count}
                </span>
                <span>
                  {" "}
                  <i className="fas fa-code-branch"></i> {repo.forks}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Repos;
