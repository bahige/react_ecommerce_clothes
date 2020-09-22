import React from "react";

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
      <ul>
        <li>
          <a href="index.html">Pants</a>
        </li>
        <li>
          <a href="index.html">Shirts</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
