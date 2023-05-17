import axios from "axios";
import { url } from "../api/index";
import * as statusActions from "../constants/statusConstants";

export const listStatuss =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: statusActions.STATUS_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/status?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: statusActions.STATUS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: statusActions.STATUS_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsStatus = (statusId) => async (dispatch) => {
  dispatch({
    type: statusActions.STATUS_DETAILS_REQUEST,
    payload: statusId,
  });
  try {
    const { data } = await axios.get(`${url}/api/status/${statusId}`);
    dispatch({
      type: statusActions.STATUS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: statusActions.STATUS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStatus = (status) => async (dispatch, getState) => {
  dispatch({
    type: statusActions.STATUS_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/status/`,
      { status },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: statusActions.STATUS_CREATE_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: statusActions.STATUS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStatus = (status) => async (dispatch, getState) => {
  dispatch({
    type: statusActions.STATUS_UPDATE_REQUEST,
    payload: status,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/status/${status._id}`,
      status,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: statusActions.STATUS_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: statusActions.STATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStatus = (statusId) => async (dispatch, getState) => {
  dispatch({
    type: statusActions.STATUS_DELETE_REQUEST,
    payload: statusId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/status/${statusId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: statusActions.STATUS_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: statusActions.STATUS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
