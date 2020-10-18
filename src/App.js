import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import DetailedProduct from "./components/DetailedProduct";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import store from "./redux/store";
import Signin from "./components/Signin";
import ProductAddForm from "./components/ProductAddForm";
import Cart from "./components/Cart";
import RegisterForm from "./components/RegisterForm";
import ShippingForm from "./components/ShippingForm";
import PaymentForm from "./components/PaymentForm";
import PlaceOrder from "./components/PlaceOrder";
import Order from "./components/Order";
import UserProfile from "./components/UserProfile";
import AllOrders from "./components/AllOrders";

import { Provider } from "react-redux";

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
      <Provider store={store}>
        <div className="App">
          <div className="grid-container">
            <Header openMenuFromHeader={openMenu}></Header>

            <aside className={`sidebar ${open}`}>
              <Sidebar closeMenuFromSidebar={closeMenu}></Sidebar>
            </aside>

            <main className="main">
              <div className="content">
                <Switch>
                  <Route
                    exact
                    path="/products"
                    component={ProductAddForm}
                  ></Route>

                  <Route exact path="/cart/:id?" component={Cart}></Route>
                  <Route
                    exact
                    path="/shipping"
                    component={ShippingForm}
                  ></Route>
                  <Route exact path="/payment" component={PaymentForm}></Route>
                  <Route
                    exact
                    path="/placeorder"
                    component={PlaceOrder}
                  ></Route>
                  <Route path="/order/:id" component={Order} />
                  <Route path="/profile" component={UserProfile} />
                  <Route path="/orders" component={AllOrders} />

                  <Route exact path="/signin" component={Signin}></Route>
                  <Route
                    exact
                    path="/register"
                    component={RegisterForm}
                  ></Route>

                  <Route
                    exact
                    path="/product/:id"
                    component={DetailedProduct}
                  ></Route>
                  <Route exact path="/" component={ProductsList}></Route>
                  <Route path="/category/:id" component={ProductsList} />
                </Switch>
              </div>
            </main>

            <Footer></Footer>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
