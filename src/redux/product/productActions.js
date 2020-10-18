import axios from "axios";

import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAILURE,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from "./productActionTypes";

const url = "http://localhost:3200/api/products";

export const fetchProductsRequest = () => {
  return {
    type: PRODUCT_LIST_REQUEST,
  };
};

export const fetchProductsSuccess = (data) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
      products : data.products,
      totalPages : data.totalPages,
      currentPage: data.currentPage,
      count: data.count,
      limit: data.limit   
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: PRODUCT_LIST_FAILURE,
    payload: error,
  };
};

export const listProducts = (
  category = "",
  searchKeyword = "",
  sortOrder = "",
  page = 1,
  limit = 6
) => async (dispatch) => {
  try {
    dispatch(fetchProductsRequest);
    const { data } = await axios.get(
      url +
        "?category=" +
        category +
        "&searchKeyword=" +
        searchKeyword +
        "&sortOrder=" +
        sortOrder + "&page=" +
        page + "&limit=" +
        limit,
    );
      dispatch(fetchProductsSuccess(data));

  } catch (error) {
    dispatch(fetchProductsFailure(error));
  }
};

//////////////////////////////////////Product Details Action /////////////////////////////////////////////////

export const fetchProductDetailsRequest = (productId) => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  };
};

export const fetchProductDetailsSuccess = (data) => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: data,
  };
};

export const fetchProductDetailsFailure = (error) => {
  return {
    type: PRODUCT_DETAILS_FAILURE,
    payload: error.message,
  };
};

export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductDetailsRequest(productId));
    const { data } = await axios.get(url + "/" + productId);
    dispatch(fetchProductDetailsSuccess(data));
  } catch (error) {
    dispatch(fetchProductDetailsFailure(error));
  }
};

//////////////////////////////////////Product Save Action /////////////////////////////////////////////////

export const productSaveRequest = (product) => {
  return {
    type: PRODUCT_SAVE_REQUEST,
    payload: product,
  };
};

export const productSaveSuccess = (data) => {
  return {
    type: PRODUCT_SAVE_SUCCESS,
    payload: data,
    success: true,
  };
};

export const productSaveFailure = (error) => {
  return {
    type: PRODUCT_SAVE_FAILURE,
    payload: error,
  };
};

export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productSaveRequest(product));
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await axios.post(
        url,
        product,

        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(productSaveSuccess(data));
    } else {
      const { data } = await axios.put(url + "/" + product._id, product, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
          // "Content-Type": "multipart/form-data",
        },
      });
      dispatch(productSaveSuccess(data));
    }
  } catch (error) {
    dispatch(productSaveFailure(error));
  }
};

////////////////////////////////Product Delete //////////////////////////////////////////

export const productDeleteRequest = (productId) => {
  return {
    type: PRODUCT_DELETE_REQUEST,
    payload: productId,
  };
};

export const productDeleteSuccess = (data) => {
  return {
    type: PRODUCT_DELETE_SUCCESS,
    payload: data,
    success: true,
  };
};

export const productDeleteFailure = (error) => {
  return {
    type: PRODUCT_DELETE_FAILURE,
    payload: error,
  };
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch(productDeleteRequest(productId));
    const { data } = await axios.delete(url + "/" + productId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch(productDeleteSuccess(data));
  } catch (error) {
    dispatch(productDeleteFailure(error));
  }
};

////////////////////////////////Product Review //////////////////////////////////////////

export const productReviewSaveRequest = (review) => {
  return { type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review };
};

export const productReviewSaveSuccess = (data) => {
  return {
    type: PRODUCT_REVIEW_SAVE_SUCCESS,
    payload: data,
    success: true,
  };
};

export const productReviewSaveFailure = (error) => {
  return {
    type: PRODUCT_REVIEW_SAVE_FAILURE,
    payload: error,
  };
};

export const saveProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(url + `/${productId}/reviews`, review, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({
      type: PRODUCT_REVIEW_SAVE_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    // report error
    dispatch({
      type: PRODUCT_REVIEW_SAVE_FAILURE,
      payload: error,
    });
  }
};
