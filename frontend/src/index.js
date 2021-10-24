import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./App.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="containerglobal">
      <App />{" "}
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
