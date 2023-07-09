import axios from "axios";
import { url } from "../api/index";
import * as userActions from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: userActions.USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(`${url}/api/users/signin`, {
      email,
      password,
    });
    dispatch({ type: userActions.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActions.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: userActions.USER_SIGNOUT });
  document.location.href = "/signin";
};

export const register = (user) => async (dispatch, getState) => {
  dispatch({
    type: userActions.USER_REGISTER_REQUEST,
    payload: { user },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(`${url}/api/users/register`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: userActions.USER_REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: userActions.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: userActions.USER_DETAILS_REQUEST,
    payload: userId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: userActions.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActions.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: userActions.USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: userActions.USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: userActions.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userActions.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: userActions.USER_UPDATE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: userActions.USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActions.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers =
  ({
    pageNumber = "",
    pageSize = "",
    name = "",
    firstName = "",
    lastName = "",
    groups = "",
  }) =>
  async (dispatch, getState) => {
    dispatch({ type: userActions.USER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/users?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&firstName=${firstName}&lastName=${lastName}&groups=${groups}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: userActions.USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: userActions.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: userActions.USER_DELETE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: userActions.USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: userActions.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
