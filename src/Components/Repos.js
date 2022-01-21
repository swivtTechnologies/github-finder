import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
const Repos = () => {
  const location = useLocation();
  const userName = location.pathname.split("/")[2];
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const [show, setShow] = useState(false);
  const [readme, setReadMe] = useState("");
  const showPopup = async (name) => {
    setErrormsg("");
    setReadMe("");
    setShow(true);
    setLoading1(true);
    await axios
      .get(`https://api.github.com/repos/${userName}/${name}/readme`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        // setRepos(response.data);

        setReadMe(atob(response.data.content));

        setLoading1(false);
      })
      .catch((error) => {
        setErrormsg("No readme found for this repo");
        setLoading1(false);

        console.log(error);
      });
  };
  useEffect(() => {
    setLoading(true);

    const getRepos = async () => {
      await axios
        .get(`https://api.github.com/users/${userName}/repos`, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN}`,
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
      <Link to="/" className="repos-btn back-btn">
        Go Back
      </Link>
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
              <span
                className="repos-btn readme-btn"
                onClick={() => showPopup(repo.name)}
              >
                Show ReadMe
              </span>
            </div>
          ))}
      </div>
      {show && (
        <div id="pop-up">
          <div className="readme-content">
            {errormsg && <span className="no-user"> {errormsg}</span>}
            {loading1 && <div className="loading">Loading.....</div>}

            {readme && (
              <div
                className="read-me-text"
                dangerouslySetInnerHTML={{ __html: readme }}
              />
            )}

            <i className="fas fa-times" onClick={() => setShow(false)}></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Repos;
