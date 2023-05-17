import axios from "axios";
import { url } from "../api/index";
import * as weekActions from "../constants/weekConstants";

export const listWeeks =
  ({
    name = "",
    pageNumber = "",
    pageSize = "",
    firstDate = "",
    lastDate = "",
  }) =>
  async (dispatch, getState) => {
    dispatch({
      type: weekActions.WEEK_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/weeks?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&firstDate=${firstDate}&lastDate=${lastDate}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: weekActions.WEEK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: weekActions.WEEK_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsWeek = (weekId) => async (dispatch, getState) => {
  dispatch({
    type: weekActions.WEEK_DETAILS_REQUEST,
    payload: weekId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/weeks/${weekId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: weekActions.WEEK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: weekActions.WEEK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createWeek = (week) => async (dispatch, getState) => {
  dispatch({
    type: weekActions.WEEK_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `${url}/api/weeks/`,
      { week },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: weekActions.WEEK_CREATE_SUCCESS,
      payload: data.week,
    });
  } catch (error) {
    dispatch({
      type: weekActions.WEEK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createManyWeeks = (weeks) => async (dispatch, getState) => {
  dispatch({
    type: weekActions.WEEK_CREATEMANY_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.post(
      `${url}/api/weeks/many`,
      { weeks },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: weekActions.WEEK_CREATEMANY_SUCCESS,
      payload: data.week,
    });
  } catch (error) {
    dispatch({
      type: weekActions.WEEK_CREATEMANY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateWeek = (week) => async (dispatch, getState) => {
  dispatch({
    type: weekActions.WEEK_UPDATE_REQUEST,
    payload: week,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/weeks/${week._id}`, week, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: weekActions.WEEK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: weekActions.WEEK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWeek = (weekId) => async (dispatch, getState) => {
  dispatch({
    type: weekActions.WEEK_DELETE_REQUEST,
    payload: weekId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/weeks/${weekId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: weekActions.WEEK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: weekActions.WEEK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
