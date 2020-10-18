import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILURE,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAILURE,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
} from "../order/orderActionTypes";

const url = "http://localhost:3200/api/orders";

export const createOrderRequest = (order) => {
  return { type: ORDER_CREATE_REQUEST, payload: order };
};

export const createOrderSuccess = (data) => {
  return { type: ORDER_CREATE_SUCCESS, payload: data };
};

export const createOrderFailure = (error) => {
  return { type: ORDER_CREATE_FAILURE, payload: error.message };
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(createOrderRequest(order));
    const {
      userSignin: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post(url, order, {
      headers: {
        Authorization: " Bearer " + userInfo.token,
      },
    });
    dispatch(createOrderSuccess(newOrder));
  } catch (error) {
    dispatch(createOrderFailure(error));
  }
};

/******************************************************************************************************/

export const orderListRequest = () => {
  return { type: ORDER_LIST_REQUEST };
};

export const orderListSuccess = (data) => {
  return { type: ORDER_LIST_SUCCESS, payload: data };
};

export const orderListFailure = (error) => {
  return { type: ORDER_LIST_FAILURE, payload: error.message };
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListRequest());
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(url, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch(orderListSuccess(data));
  } catch (error) {
    dispatch(orderListFailure(error));
  }
};

/******************************************************************************************************/

export const myOrderListRequest = () => {
  return { type: MY_ORDER_LIST_REQUEST };
};

export const myOrderListSuccess = (data) => {
  return { type: MY_ORDER_LIST_SUCCESS, payload: data };
};

export const myOrderListFailure = (error) => {
  return { type: MY_ORDER_LIST_FAILURE, payload: error.message };
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(myOrderListRequest());
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(url + "/mine", {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch(myOrderListSuccess(data));
  } catch (error) {
    dispatch(myOrderListFailure(error));
  }
};

/******************************************************************************************************/

export const detailOrdersRequest = (orderId) => {
  return { type: ORDER_DETAILS_REQUEST };
};

export const detailOrdersSuccess = (data) => {
  return { type: ORDER_DETAILS_SUCCESS, payload: data };
};

export const detailOrdersFailure = (error) => {
  return { type: ORDER_DETAILS_FAILURE, payload: error.message };
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch(detailOrdersRequest(orderId));
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(url + `/${orderId}`, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch(detailOrdersSuccess(data));
  } catch (error) {
    dispatch(detailOrdersFailure(error));
  }
};

/******************************************************************************************************/

export const payOrderRequest = (paymentResult) => {
  return { type: ORDER_PAY_REQUEST, payload: paymentResult };
};

export const payOrderSuccess = (data) => {
  return { type: ORDER_PAY_SUCCESS, payload: data };
};

export const payOrderFailure = (error) => {
  return { type: ORDER_PAY_FAILURE, payload: error.message };
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(payOrderRequest(paymentResult));
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(url + `/${order._id}/pay`, paymentResult, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch(payOrderSuccess(data));
  } catch (error) {
    dispatch(payOrderFailure(error));
  }
};

/******************************************************************************************************/

export const deleteOrderRequest = (orderId) => {
  return { type: ORDER_DELETE_REQUEST, payload: orderId };
};

export const deleteOrderSuccess = (data) => {
  return { type: ORDER_DELETE_SUCCESS, payload: data };
};

export const deleteOrderFailure = (error) => {
  return { type: ORDER_DELETE_FAILURE, payload: error.message };
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch(deleteOrderRequest(orderId));
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete(url + "/" + orderId, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch(deleteOrderSuccess(data));
  } catch (error) {
    dispatch(deleteOrderFailure(error));
  }
};
