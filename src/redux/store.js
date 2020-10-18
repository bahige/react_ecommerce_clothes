import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewSaveReducer,
  productSaveReducer,
} from "./product/productReducer";
import thunk from "redux-thunk";
import {
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from "./user/userReducer";
import { cartReducer } from "./cart/cartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from "./order/orderReducers";

import Cookie from "js-cookie";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = { cart: { cartItems }, userSignin: { userInfo } };

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  myOrderList: myOrderListReducer,
  orderDelete: orderDeleteReducer,
});

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
