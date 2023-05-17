import axios from "axios";
import { url } from "../api/index";
import * as itemStatusActions from "../constants/itemStatusConstants";

export const listItemStatuss =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: itemStatusActions.ITEMSTATUS_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/itemStatus?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: itemStatusActions.ITEMSTATUS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: itemStatusActions.ITEMSTATUS_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsItemStatus = (itemStatusId) => async (dispatch) => {
  dispatch({
    type: itemStatusActions.ITEMSTATUS_DETAILS_REQUEST,
    payload: itemStatusId,
  });
  try {
    const { data } = await axios.get(`${url}/api/itemStatus/${itemStatusId}`);
    dispatch({
      type: itemStatusActions.ITEMSTATUS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: itemStatusActions.ITEMSTATUS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createItemStatus = (itemStatus) => async (dispatch, getState) => {
  dispatch({
    type: itemStatusActions.ITEMSTATUS_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/itemStatus/`,
      { itemStatus },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: itemStatusActions.ITEMSTATUS_CREATE_SUCCESS,
      payload: data.itemStatus,
    });
  } catch (error) {
    dispatch({
      type: itemStatusActions.ITEMSTATUS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateItemStatus = (itemStatus) => async (dispatch, getState) => {
  dispatch({
    type: itemStatusActions.ITEMSTATUS_UPDATE_REQUEST,
    payload: itemStatus,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/itemStatus/${itemStatus._id}`,
      itemStatus,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: itemStatusActions.ITEMSTATUS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: itemStatusActions.ITEMSTATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteItemStatus =
  (itemStatusId) => async (dispatch, getState) => {
    dispatch({
      type: itemStatusActions.ITEMSTATUS_DELETE_REQUEST,
      payload: itemStatusId,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(
        `${url}/api/itemStatus/${itemStatusId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: itemStatusActions.ITEMSTATUS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: itemStatusActions.ITEMSTATUS_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
