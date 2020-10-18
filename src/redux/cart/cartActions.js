import axios from "axios";
import Cookie from "js-cookie";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
  CART_CLEAR_ALL,
} from "./cartActionTypes";

const url = "http://localhost:3200/api/products";

///////////////////////////////////Add to Cart//////////////////////////////////////////////

export const addToCartSuccess = (data, qty) => {
  return {
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  };
};

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(url + `/${productId}`);
  dispatch(addToCartSuccess(data, qty));

  const {
    cart: { cartItems },
  } = getState();

  Cookie.set("cartItems", JSON.stringify(cartItems));
};

///////////////////////////////////Remove From Cart//////////////////////////////////////////////

export const removeFromCartSuccess = (productId) => {
  return { type: CART_REMOVE_ITEM, payload: productId };
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch(removeFromCartSuccess(productId));

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

///////////////////////////////////Save Shipping//////////////////////////////////////////////

export const saveShippingAction = (data) => {
  return { type: CART_SAVE_SHIPPING, payload: data };
};

export const saveShipping = (data) => (dispatch) => {
  dispatch(saveShippingAction(data));
};
// Because it is triggered from the client side, this action is not async.

export const savePaymentAction = (data) => {
  return { type: CART_SAVE_PAYMENT, payload: data };
};

export const savePayment = (data) => (dispatch) => {
  dispatch(savePaymentAction(data));
};

///////////////////////////////////Clear Cart////////////////////////////////////

export const clearCart = () => (dispatch) => {
  Cookie.remove("cartItems");
  dispatch({ type: CART_CLEAR_ALL });
};
