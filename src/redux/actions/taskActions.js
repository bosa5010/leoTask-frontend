import axios from "axios";
import { url } from "../api/index";
import * as taskActions from "../constants/taskConstants";

export const listTasks =
  ({
    description = "",
    pageNumber = "",
    pageSize = "",
    taskModels = "",
    status = "",
    reference = "",
    users = "",
    instance = "",
    firstDate = "",
    lastDate = "",
  }) =>
  async (dispatch, getState) => {
    dispatch({
      type: taskActions.TASK_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/tasks?pageNumber=${pageNumber}&pageSize=${pageSize}&description=${description}&taskModels=${taskModels}&reference=${reference}&status=${status}&users=${users}&instance=${instance}&lastDate=${lastDate}&firstDate=${firstDate}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: taskActions.TASK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: taskActions.TASK_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsTask = (taskId) => async (dispatch, getState) => {
  dispatch({
    type: taskActions.TASK_DETAILS_REQUEST,
    payload: taskId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: taskActions.TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskActions.TASK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTask = (task) => async (dispatch, getState) => {
  dispatch({
    type: taskActions.TASK_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/tasks/`,
      { task },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: taskActions.TASK_CREATE_SUCCESS,
      payload: data.task,
    });
  } catch (error) {
    dispatch({
      type: taskActions.TASK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTasks = (tasks) => async (dispatch, getState) => {
  dispatch({
    type: taskActions.TASKS_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/tasks/many`,
      { tasks },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: taskActions.TASKS_CREATE_SUCCESS,
      payload: data.tasks,
    });
  } catch (error) {
    dispatch({
      type: taskActions.TASKS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTask = (task) => async (dispatch, getState) => {
  dispatch({
    type: taskActions.TASK_UPDATE_REQUEST,
    payload: task,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/tasks/${task._id}`, task, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: taskActions.TASK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskActions.TASK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTask = (taskId) => async (dispatch, getState) => {
  dispatch({
    type: taskActions.TASK_DELETE_REQUEST,
    payload: taskId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: taskActions.TASK_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: taskActions.TASK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
