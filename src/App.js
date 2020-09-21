import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";

function App() {
  const [open, setOpen] = useState("");

  const openMenu = () => {
    setOpen("open");
  };

  const closeMenu = () => {
    setOpen("");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="grid-container">
          <header className="header">
            <div className="brand">
              <button onClick={openMenu}>&#9776;</button>
              <Link to="/">amazona</Link>
            </div>
            <div className="header-links">
              <a href="cart.html">Cart</a>
              <a href="signin.html">Sign In</a>
            </div>
          </header>
          <aside className={`sidebar ${open}`}>
            <div>
              <h3>Shopping Categories</h3>
              <button className="sidebar-close" onClick={closeMenu}>
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
          </aside>
          <Switch>
            <main className="main">
              <div className="content">
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/product/:id" component={Products}></Route>
              </div>
            </main>
          </Switch>

          <footer className="footer">All Rights Reserved.</footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
