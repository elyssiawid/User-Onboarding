import logo from "./logo.svg";
import UserForm from "./components/UserForm";
import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        <UserForm />
      </div>
    );
  }
}
