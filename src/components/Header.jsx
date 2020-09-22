import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { openMenuFromHeader } = props;
  return (
    <div className="header">
      <div className="brand">
        <button onClick={openMenuFromHeader}>&#9776;</button>
        <Link to="/">amazona</Link>
      </div>
      <div className="header-links">
        <a href="cart.html">Cart</a>
        <a href="signin.html">Sign In</a>
      </div>
    </div>
  );
};

export default Header;
