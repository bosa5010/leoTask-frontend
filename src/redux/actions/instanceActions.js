import axios from "axios";
import { url } from "../api/index";
import * as instanceActions from "../constants/instanceConstants";

export const listInstances =
  ({ name = "", pageNumber = "", pageSize = "", system = "", systems = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: instanceActions.INSTANCE_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/instances?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&system=${system}&systems=${systems}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: instanceActions.INSTANCE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: instanceActions.INSTANCE_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsInstance = (instanceId) => async (dispatch, getState) => {
  dispatch({
    type: instanceActions.INSTANCE_DETAILS_REQUEST,
    payload: instanceId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/instances/${instanceId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: instanceActions.INSTANCE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: instanceActions.INSTANCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createInstance = (instance) => async (dispatch, getState) => {
  dispatch({
    type: instanceActions.INSTANCE_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/instances/`,
      { instance },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: instanceActions.INSTANCE_CREATE_SUCCESS,
      payload: data.instance,
    });
  } catch (error) {
    dispatch({
      type: instanceActions.INSTANCE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateInstance = (instance) => async (dispatch, getState) => {
  dispatch({
    type: instanceActions.INSTANCE_UPDATE_REQUEST,
    payload: instance,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/instances/${instance._id}`,
      instance,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: instanceActions.INSTANCE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: instanceActions.INSTANCE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteInstance = (instanceId) => async (dispatch, getState) => {
  dispatch({
    type: instanceActions.INSTANCE_DELETE_REQUEST,
    payload: instanceId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/instances/${instanceId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: instanceActions.INSTANCE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: instanceActions.INSTANCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
