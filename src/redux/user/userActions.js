import axios from "axios";
import Cookie from "js-cookie";

import {
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_LOGOUT,
} from "./userActionTypes";

const url = "http://localhost:3200/api/users";

export const signinUsersRequest = (email, password) => {
  return {
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  };
};

export const signinUsersSuccess = (data) => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: data,
  };
};

export const signinUsersFailure = (error) => {
  return {
    type: USER_SIGNIN_FAILURE,
    payload: error,
  };
};

export const signin = (email, password) => async (dispatch) => {
  dispatch(signinUsersRequest(email, password));
  try {
    const { data } = await axios.post(url + "/signin", { email, password });
    dispatch(signinUsersSuccess(data));
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(signinUsersFailure(error));
  }
};

/////////////////////////Register/////////////////////////

export const registerUsersRequest = (email, password) => {
  return {
    type: USER_REGISTER_REQUEST,
    payload: { email, password },
  };
};

export const registerUsersSuccess = (data) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerUsersFailure = (error) => {
  return {
    type: USER_REGISTER_FAILURE,
    payload: error,
  };
};

export const registerUser = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(url + "/register", {
      name,
      email,
      password,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error,
    });
  }
};

/////////////////////////Update /////////////////////////

export const updateUsersRequest = ({ userId, name, email, password }) => {
  return {
    type: USER_UPDATE_REQUEST,
    payload: { userId, name, email, password },
  };
};

export const updateUsersSuccess = (data) => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload: data,
  };
};

export const updateUsersFailure = (error) => {
  return {
    type: USER_UPDATE_FAILURE,
    payload: error,
  };
};

export const update = ({ userId, name, email, password }) => async (
  dispatch,
  getState
) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch(updateUsersRequest({ userId, name, email, password }));
  try {
    const { data } = await axios.put(
      url + `/${userId}`,
      { name, email, password },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch(updateUsersSuccess(data));
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(updateUsersFailure(error));
  }
};

export const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
};
