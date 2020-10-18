import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cart/cartActions";
import { Link } from "react-router-dom";
import "./cartStyle.css";

const Cart = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {};
  }, []);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div> Price</div>
          </li>

          {!cartItems || cartItems.length === 0 ? (
            <div> Cart is Empty</div>
          ) : (
            cartItems.map((item, index) => (
              <li key={index}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        {!cartItems ? (
          <h3> Your cart is empty.</h3>
        ) : (
          <h3>
            Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
        )}
        <button
          onClick={checkoutHandler}
          className="button primary full-width"
          disabled={!cartItems || cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
