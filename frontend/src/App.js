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
        //backend : auth(app)/auth(route)
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
			photo_profil: response.data.photo_profil,
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
    <div className="App2">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="flex3">
            <h1>
              <Link to={`/profile/${authState.id}`}> {authState.username}</Link>
            </h1>{" "}
            <div className="deco">
              {authState.status && (
                <button onClick={logout}> Déconnexion</button>
              )}{" "}
            </div>
            <div className="primary">
              {authState.status && <Link to="/createpost"> Créer un Post</Link>}
            </div>
            <div className="primary">
              {authState.status && <Link to="/"> Fils d'actualités</Link>}
            </div>
            <div className="menu">
              {" "}
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
