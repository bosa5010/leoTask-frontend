import axios from "axios";
import { url } from "../api/index";
import * as taskThemeActions from "../constants/taskThemeConstants";

export const listTaskThemes =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: taskThemeActions.TASKTHEME_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/taskThemes?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: taskThemeActions.TASKTHEME_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: taskThemeActions.TASKTHEME_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const frozenListTaskThemes =
  ({ name = "", pageNumber = "", pageSize = "", teams }) =>
  async (dispatch, getState) => {
    dispatch({
      type: taskThemeActions.TASKTHEME_FROZEN_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/taskThemes?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&teams=${teams}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: taskThemeActions.TASKTHEME_FROZEN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: taskThemeActions.TASKTHEME_FROZEN_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsTaskTheme = (taskThemeId) => async (dispatch, getState) => {
  dispatch({
    type: taskThemeActions.TASKTHEME_DETAILS_REQUEST,
    payload: taskThemeId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/taskThemes/${taskThemeId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: taskThemeActions.TASKTHEME_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskThemeActions.TASKTHEME_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTaskTheme = (taskTheme) => async (dispatch, getState) => {
  dispatch({
    type: taskThemeActions.TASKTHEME_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/taskThemes/`,
      { taskTheme },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: taskThemeActions.TASKTHEME_CREATE_SUCCESS,
      payload: data.taskTheme,
    });
  } catch (error) {
    dispatch({
      type: taskThemeActions.TASKTHEME_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTaskTheme = (taskTheme) => async (dispatch, getState) => {
  dispatch({
    type: taskThemeActions.TASKTHEME_UPDATE_REQUEST,
    payload: taskTheme,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/taskThemes/${taskTheme._id}`,
      taskTheme,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: taskThemeActions.TASKTHEME_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskThemeActions.TASKTHEME_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTaskTheme = (taskThemeId) => async (dispatch, getState) => {
  dispatch({
    type: taskThemeActions.TASKTHEME_DELETE_REQUEST,
    payload: taskThemeId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(
      `${url}/api/taskThemes/${taskThemeId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: taskThemeActions.TASKTHEME_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskThemeActions.TASKTHEME_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
