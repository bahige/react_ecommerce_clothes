import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
          <Header openMenuFromHeader={openMenu}></Header>

          <aside className={`sidebar ${open}`}>
            <Sidebar closeMenuFromSidebar={closeMenu}></Sidebar>
          </aside>

          <Switch>
            <main className="main">
              <div className="content">
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/product/:id" component={Products}></Route>
              </div>
            </main>
          </Switch>

          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
