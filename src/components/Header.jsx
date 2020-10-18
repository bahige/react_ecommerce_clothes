import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/user/userActions";


const Header = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const [displayAdmin, setDisplayAdmin] = useState("display-dropdown-hide");
  const [toggle, setToggle] = useState({ toggle: false });

  const { openMenuFromHeader } = props;


  const menuToggle = () => {
    setToggle((prevState) => {
      return { toggle: !prevState.toggle };
    });
    toggle.toggle
      ? setDisplayAdmin("display-dropdown-block")
      : setDisplayAdmin("display-dropdown-hide");
  };


  const closeAdminMenu = () => {
    setDisplayAdmin("display-dropdown-hide");
  };
  const paddingStyle = {
    padding: "0.4rem 0",
  };

  const signOut = () => {
    dispatch(logout());
    setDisplayAdmin("display-dropdown-hide");
  };

  /////////////////////////////////////////////////

  const [displayMenu, setDisplayMenu] = useState("hideMenu");
  const [toggleDropDown, setToggleDropDown] = useState({ toggle: false });


  const menuDropDownToggle = () => {
    setToggleDropDown((prevState) => {
      return { toggle: !prevState.toggle };
    });
    toggleDropDown.toggle
      ? setDisplayMenu("displayMenu")
      : setDisplayMenu( "hideMenu");
  };

  ///////////////////////////////////////////////////////////

  return (
    <div className="header">
      <div className="brand">
        <button onClick={openMenuFromHeader}>&#9776;</button>
        <Link to="/">Men's Corner</Link>
      </div>
      <nav>
      <div className={`header-links ${displayMenu}`}>
        {userInfo ? (
          <div>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div></div>
        )}
        {userInfo ? (
          <div>
            <Link to="/profile">{userInfo.name}</Link>
          </div>
        ) : (
          <div>
            <Link to="/signin">Sign In </Link>
          </div>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <div onClick={menuToggle}>
              <a href="#">Admin</a>
            </div>
            <ul className={`dropdown-content ${displayAdmin}`}>
              <li>
                <div style={paddingStyle} onClick={closeAdminMenu}>
                  <Link to="/orders">Orders</Link>
                </div>
              </li>
              <li>
                <div style={paddingStyle} onClick={closeAdminMenu}>
                  <Link to="/products">Products</Link>
                </div>
              </li>
            </ul>
          </div>
        )}
        {userInfo ? (
          <div onClick={signOut}>
            <Link to="/signin">Sign Out</Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      </nav>
        <button onClick={menuDropDownToggle} className="menuIcon">&#9776;</button>
    </div>
  );
};

export default Header;
