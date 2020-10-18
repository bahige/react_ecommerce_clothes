import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./signin.css";
import { registerUser } from "../redux/user/userActions";

function RegisterForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameErrors, setNameErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
  };

  const validateEmail = (email) => {
    let errors = "";
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) {
      errors = "Required";
    } else if (!emailRegex.test(email)) {
      errors = "Invalid email address";
    }
    setEmailErrors(errors);
  };

  const validateName = (name) => {
    let errors = "";
    if (!name) {
      errors = "Required";
    }
    setNameErrors(errors);
  };

  const validatePassword = (password) => {
    let errors = "";
    if (!password) {
      errors = "Required";
    }
    setPasswordErrors(errors);
  };

  const validateConfirmPassword = (confirmPassword) => {
    let errors = "";
    if (!confirmPassword) {
      errors = "Required";
    } else if (confirmPassword !== password) {
      errors = "Password and Confirm Password must be identical.";
    }
    setConfirmPasswordErrors(errors);
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li className="text-center">
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onBlur={(e) => validateName(e.target.value)}
              onChange={(e) => setName(e.target.value)}
            ></input>
            {nameErrors ? (
              <div className="validation-message"> {nameErrors} </div>
            ) : null}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onBlur={(e) => validateEmail(e.target.value)}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {emailErrors ? (
              <div className="validation-message"> {emailErrors} </div>
            ) : null}
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onBlur={(e) => validatePassword(e.target.value)}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {passwordErrors ? (
              <div className="validation-message"> {passwordErrors} </div>
            ) : null}
          </li>
          <li>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              required
              onBlur={(e) => validateConfirmPassword(e.target.value)}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            {confirmPasswordErrors ? (
              <div className="validation-message">
                {" "}
                {confirmPasswordErrors}{" "}
              </div>
            ) : null}
          </li>
          <li>
            <button
              type="submit"
              className="button primary"
              disabled={
                nameErrors ||
                emailErrors ||
                passwordErrors ||
                confirmPasswordErrors
              }
            >
              Register
            </button>
          </li>
          <li className="text-center">
            Already have an account?{" "}
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
            >
              Sign In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterForm;
