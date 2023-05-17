import axios from "axios";
import { url } from "../api/index";
import * as stepActions from "../constants/stepConstants";

export const listSteps =
  ({ name = "", pageNumber = "", pageSize = "", taskModel = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: stepActions.STEP_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/steps?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&taskModel=${taskModel}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: stepActions.STEP_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: stepActions.STEP_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsStep = (stepId) => async (dispatch, getState) => {
  dispatch({
    type: stepActions.STEP_DETAILS_REQUEST,
    payload: stepId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/steps/${stepId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: stepActions.STEP_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: stepActions.STEP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStep = (step) => async (dispatch, getState) => {
  dispatch({
    type: stepActions.STEP_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/steps/`,
      { step },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: stepActions.STEP_CREATE_SUCCESS,
      payload: data.step,
    });
  } catch (error) {
    dispatch({
      type: stepActions.STEP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStep = (step) => async (dispatch, getState) => {
  dispatch({
    type: stepActions.STEP_UPDATE_REQUEST,
    payload: step,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/steps/${step._id}`, step, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: stepActions.STEP_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: stepActions.STEP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStep = (stepId) => async (dispatch, getState) => {
  dispatch({
    type: stepActions.STEP_DELETE_REQUEST,
    payload: stepId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/steps/${stepId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: stepActions.STEP_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: stepActions.STEP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
