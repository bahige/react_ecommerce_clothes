import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./signin.css";
import { signin } from "../redux/user/userActions";

function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
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

    dispatch(signin(email, password));
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

  const validatePassword = (password) => {
    let errors = "";
    const passwordRegex = /(?=.*[0-9])/;
    if (!password) {
      errors = "Required";
    } else if (password.length < 8) {
      errors = "Password must be 8 characters long.";
    } else if (!passwordRegex.test(password)) {
      errors = "Invalid password. Must contain one number";
    }
    setPasswordErrors(errors);
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li className="text-center">
            <h2>Sign In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && error.message.includes("status code 401") && (
              <div className="validation-message">
                Either email or password are incorrect{" "}
              </div>
            )}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
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
            <button
              type="submit"
              className="button primary"
              disabled={emailErrors || passwordErrors}
            >
              Sign In
            </button>
          </li>
          <li className="text-center">New to amazona?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : "register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default Signin;
