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
import Delete from "./pages/Delete";

import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    email: "",
    id: 0,
    photo_profil: "",

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
            email: response.data.email,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", username: "", id: 0, status: false });
  };

  return (
    <div className="App2">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="flex3">
            <div className="usernameaccueil">
              <h1>
                <Link to={`/profile/${authState.id}`}>
                  {authState.username}
                </Link>
              </h1>{" "}
            </div>{" "}
            <div className="deco">
              {authState.status && (
                <button onClick={logout}> Déconnexion</button>
              )}{" "}
            </div>{" "}
            <div className="principal">
              <div className="primary">
                {authState.status && (
                  <Link to="/createpost"> Créer un Post</Link>
                )}
              </div>
              <div className="primary">
                {authState.status && <Link to="/"> Fils d'actualités</Link>}
              </div>{" "}
            </div>{" "}
            {!authState.status && (
              <>
                {" "}
                <div className="coenr">
                  {" "}
                  <Link to="/login"> Connexion</Link>{" "}
                </div>
                <div className="coenr2">
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
            <Route path="/delete" exact component={Delete} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
