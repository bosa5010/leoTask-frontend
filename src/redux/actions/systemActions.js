import axios from "axios";
import { url } from "../api/index";
import * as systemActions from "../constants/systemConstants";

export const listSystems =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: systemActions.SYSTEM_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/systems?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: systemActions.SYSTEM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: systemActions.SYSTEM_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsSystem = (systemId) => async (dispatch) => {
  dispatch({
    type: systemActions.SYSTEM_DETAILS_REQUEST,
    payload: systemId,
  });
  try {
    const { data } = await axios.get(`${url}/api/systems/${systemId}`);
    dispatch({
      type: systemActions.SYSTEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: systemActions.SYSTEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSystem = (system) => async (dispatch, getState) => {
  dispatch({
    type: systemActions.SYSTEM_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/systems/`,
      { system },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: systemActions.SYSTEM_CREATE_SUCCESS,
      payload: data.system,
    });
  } catch (error) {
    dispatch({
      type: systemActions.SYSTEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSystem = (system) => async (dispatch, getState) => {
  dispatch({
    type: systemActions.SYSTEM_UPDATE_REQUEST,
    payload: system,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/systems/${system._id}`,
      system,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: systemActions.SYSTEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: systemActions.SYSTEM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSystem = (systemId) => async (dispatch, getState) => {
  dispatch({
    type: systemActions.SYSTEM_DELETE_REQUEST,
    payload: systemId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/systems/${systemId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: systemActions.SYSTEM_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: systemActions.SYSTEM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
