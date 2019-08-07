import React from "react";
import logo from "./logo.svg";
import Form from "./components/Form";
import "./App.css";

const Form = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUser([...URLSearchParams, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <h1>User Form</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <Field type="text" name="email" placeholder="Email" />
        <Field type="text" name="password" placeholder="Password" />
        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termofservice"
            checked={values.termsofservice}
          />
          <span className="checkmark" />
        </label>
        <button type="submit">Submit!</button>
      </Form>

    </div>
  )

  const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, termsofservice }) {
      return {
        name: name || '',
       email: email|| '',
        password: password || '',
        termsofservice: termsofservice || false,
      };
    },
  
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string() 
      .min(6, "Email must be 6 characters or longer")
      .required("Email is required"),
      password:  Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
  })(Form);

export default Form;
