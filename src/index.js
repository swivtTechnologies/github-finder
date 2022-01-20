import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Repos from "./Components/Repos";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <App /> */}
        <Route path="/" exact element={<App />} />
        <Route path="/repos/:userName" exact element={<Repos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
