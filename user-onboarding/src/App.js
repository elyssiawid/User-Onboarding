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

    </div>
  )

export default Form;
