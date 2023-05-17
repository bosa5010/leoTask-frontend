import axios from "axios";
import { url } from "../api/index";
import * as itemActions from "../constants/itemConstants";

export const listItems =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: itemActions.ITEM_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/items?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: itemActions.ITEM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: itemActions.ITEM_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsItem = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: itemActions.ITEM_DETAILS_REQUEST,
    payload: itemId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/items/${itemId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: itemActions.ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: itemActions.ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createItem = (item) => async (dispatch, getState) => {
  dispatch({
    type: itemActions.ITEM_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/items/`,
      { item },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: itemActions.ITEM_CREATE_SUCCESS,
      payload: data.item,
    });
  } catch (error) {
    dispatch({
      type: itemActions.ITEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateItem = (item) => async (dispatch, getState) => {
  dispatch({
    type: itemActions.ITEM_UPDATE_REQUEST,
    payload: item,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/items/${item._id}`, item, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: itemActions.ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: itemActions.ITEM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteItem = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: itemActions.ITEM_DELETE_REQUEST,
    payload: itemId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/items/${itemId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: itemActions.ITEM_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: itemActions.ITEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
