import axios from "axios";
import { url } from "../api/index";
import * as taskModelActions from "../constants/taskModelConstants";

export const listTaskModels =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: taskModelActions.TASKMODEL_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/taskModels?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: taskModelActions.TASKMODEL_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: taskModelActions.TASKMODEL_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const frozenListTaskModels =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: taskModelActions.TASKMODEL_FROZEN_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/taskModels?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: taskModelActions.TASKMODEL_FROZEN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: taskModelActions.TASKMODEL_FROZEN_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsTaskModel = (taskModelId) => async (dispatch, getState) => {
  dispatch({
    type: taskModelActions.TASKMODEL_DETAILS_REQUEST,
    payload: taskModelId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/taskModels/${taskModelId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: taskModelActions.TASKMODEL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskModelActions.TASKMODEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTaskModel = (taskModel) => async (dispatch, getState) => {
  dispatch({
    type: taskModelActions.TASKMODEL_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/taskModels/`,
      { taskModel },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: taskModelActions.TASKMODEL_CREATE_SUCCESS,
      payload: data.taskModel,
    });
  } catch (error) {
    dispatch({
      type: taskModelActions.TASKMODEL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTaskModel = (taskModel) => async (dispatch, getState) => {
  dispatch({
    type: taskModelActions.TASKMODEL_UPDATE_REQUEST,
    payload: taskModel,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/taskModels/${taskModel._id}`,
      taskModel,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: taskModelActions.TASKMODEL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskModelActions.TASKMODEL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTaskModel = (taskModelId) => async (dispatch, getState) => {
  dispatch({
    type: taskModelActions.TASKMODEL_DELETE_REQUEST,
    payload: taskModelId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(
      `${url}/api/taskModels/${taskModelId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: taskModelActions.TASKMODEL_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskModelActions.TASKMODEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
