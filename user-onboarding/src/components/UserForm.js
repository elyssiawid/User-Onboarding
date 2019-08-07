import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values, status }) => {
  const [users, setUsers] = useState([]);
  console.log("hey!", users);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <h1>User Form</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termsofservice"
            checked={values.termsofservice}
          />
          {touched.termofservice && errors.termofservice && (
            <p className="error">{errors.termofservice}</p>
          )}
          <span className="checkmark" />
        </label>
        <button type="submit">Submit!</button>
      </Form>
      {users ? users.map(user => <p key={user.id}>{user.name}</p>) : null}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, termsofservice }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsofservice: termsofservice || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required"),
    termsofservice: Yup.bool().oneOf(
      [true],
      "You must agree to the Terms of Service"
    )
  }),

  handleSubmit(values, { setStatus }) {
    console.log("submit", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => setStatus(res.data))
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;
