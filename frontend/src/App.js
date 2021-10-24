import "./App.css";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//components
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="loggedInContainer">
            <h1>
              <Link to={`/profile/${authState.id}`}>
                {" "}
                {authState.username}{" "}
              </Link>
            </h1>
            {authState.status && <button onClick={logout}> Déconnexion</button>}
          </div>
          <div className="menu">
            {" "}
            <div className="primary">
              {" "}
              <Link to="/"> Page d'accueil</Link>{" "}
            </div>
            <div className="primary">
              <Link to="/createpost"> créer un Post</Link>{" "}
            </div>
            {!authState.status && (
              <>
                <div className="primary">
                  {" "}
                  <Link to="/login"> Se connecter</Link>{" "}
                </div>
                <div className="primary">
                  {" "}
                  <Link to="/registration"> S'enregistrer</Link>{" "}
                </div>
              </>
            )}
          </div>{" "}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
