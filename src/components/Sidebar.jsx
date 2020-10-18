import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const { closeMenuFromSidebar } = props;

  return (
    <div>
      <div>
        <h3>Shopping Categories</h3>
        <button className="sidebar-close" onClick={closeMenuFromSidebar}>
          X
        </button>
      </div>
      <ul className="categories">
        <li>
          <Link to="/category/Pants">Pants</Link>
        </li>

        <li>
          <Link to="/category/Shirts">Shirts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
