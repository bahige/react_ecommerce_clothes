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
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAILURE,
} from "../order/orderActionTypes";

export function orderCreateReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function orderDetailsReducer(
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function myOrderListReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MY_ORDER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function orderListReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function orderPayReducer(
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function orderDeleteReducer(
  state = {
    order: {
      orderItems: [],
      shipping: {},
      payment: {},
    },
  },
  action
) {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
