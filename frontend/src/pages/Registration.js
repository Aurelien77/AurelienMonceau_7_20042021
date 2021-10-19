import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string().min(4).max(30).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="username"
            className="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="password"
            className="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <label>email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            id="email"
            className="inputCreatePost"
            name="email"
            placeholder="(Ex. John@groupomania.com...)"
          />

          <button type="submit"> Enregistrer</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
