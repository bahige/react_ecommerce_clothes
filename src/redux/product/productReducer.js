import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAILURE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_REVIEW_SAVE_FAILURE,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_RESET,
} from "./productActionTypes";

function productListReducer(state = { }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.products,
        count: action.count,
        limit: action.limit,
        error: "",
      };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, products: [], error: action.payload };
    default:
      return state;
  }
}

function productDetailsReducer(state = { product: { reviews: [] } }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: action.payload, error: "" };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, error: "" };
    case PRODUCT_DETAILS_FAILURE:
      return { loading: false, product: {}, error: action.payload };
    default:
      return state;
  }
}

function productSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
        error: "",
      };
    case PRODUCT_SAVE_FAILURE:
      return { loading: false, product: {}, error: action.payload };
    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case PRODUCT_REVIEW_SAVE_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
};
