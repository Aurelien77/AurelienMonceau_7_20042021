import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../helpers/AuthContext";

/* 
useEffect(() => {
const Delete = (id) => {
  axios
    .delete(
      `http://localhost:3001/delete/${id}`,
      
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((response) => {
      if (response) {
        /*    console.log(response.data); */
/* 
      } else {
        alert("Compte supprimé ");
        /*     <Redirect to="/login" />; */
/*    }
    });      

 */

const logout = () => {
  localStorage.removeItem("accessToken");
};

function Delete() {
  let history = useHistory();
  let { id } = useParams();

  const { authState } = useContext(AuthContext);

  useEffect((id) => {
    axios
      .delete(`http://localhost:3001/delete/${authState.id}`)

      .then((response) => {
        localStorage.removeItem("accessToken");
        history.push("/login");
        logout();
      });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          {
            Delete();
          }
        }}
      >
        Suppprimer le compte ?
      </button>
    </div>
  );
}

export default Delete;
