import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let history = useHistory();
  const initialValues = {
    title: "",
    postText: "",
    lien: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vous devez entrer un titre"),
    postText: Yup.string()
      .min(3)
      .max(1600000)
      .required("Vous devez entrer du texte"),
    lien: Yup.string().notRequired("Vous pouvez poster sans insérer de lien"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history.push("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer2">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
            min="10"
            max="10000"
          />

          <label>Noter ici votre lien: </label>
          <ErrorMessage name="lien" component="span" />
          <Field
            autocomplete="off"
            id="lien"
            name="lien"
            placeholder="(Ex. htpp://monlien.com...)"
          />

          <button type="submit"> Créer un Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
