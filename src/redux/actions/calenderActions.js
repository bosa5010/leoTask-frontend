import axios from "axios";
import { url } from "../api/index";
import * as calenderActions from "../constants/calenderConstants";

export const listCalenders =
  ({ name = "", pageNumber = "", pageSize = "", users = "", weeks = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: calenderActions.CALENDER_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/calenders?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&users=${users}&weeks=${weeks}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: calenderActions.CALENDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: calenderActions.CALENDER_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsCalender = (calenderId) => async (dispatch, getState) => {
  dispatch({
    type: calenderActions.CALENDER_DETAILS_REQUEST,
    payload: calenderId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/calenders/${calenderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: calenderActions.CALENDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: calenderActions.CALENDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCalender = (calender) => async (dispatch, getState) => {
  dispatch({
    type: calenderActions.CALENDER_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/calenders/`,
      { calender },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: calenderActions.CALENDER_CREATE_SUCCESS,
      payload: data.calender,
    });
  } catch (error) {
    dispatch({
      type: calenderActions.CALENDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCalender = (calender) => async (dispatch, getState) => {
  dispatch({
    type: calenderActions.CALENDER_UPDATE_REQUEST,
    payload: calender,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/calenders/${calender._id}`,
      calender,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: calenderActions.CALENDER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: calenderActions.CALENDER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCalender = (calenderId) => async (dispatch, getState) => {
  dispatch({
    type: calenderActions.CALENDER_DELETE_REQUEST,
    payload: calenderId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/calenders/${calenderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: calenderActions.CALENDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: calenderActions.CALENDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
