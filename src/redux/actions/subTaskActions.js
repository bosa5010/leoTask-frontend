import axios from "axios";
import { url } from "../api/index";
import * as subTaskActions from "../constants/subTaskConstants";

export const listSubTasks =
  ({
    pageNumber = "",
    pageSize = "",
    itemComment = "",
    taskModels = "",
    reference = "",
    users = "",
    instance = "",
    items = "",
    itemStatus = "",
    firstDate = "",
    lastDate = "",
    taskStep = "",
    systems = "",
    tasks = "",
    task = "",
  }) =>
  async (dispatch, getState) => {
    dispatch({
      type: subTaskActions.SUBTASK_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/subTasks?pageNumber=${pageNumber}&pageSize=${pageSize}&task=${task}&tasks=${tasks}&itemComment=${itemComment}&reference=${reference}&taskModels=${taskModels}&taskStep=${taskStep}&systems=${systems}&reference=${reference}&users=${users}&instance=${instance}&lastDate=${lastDate}&firstDate=${firstDate}&items=${items}&itemStatus=${itemStatus}`,
        { headers: { Authorization: `Bearer ${userInfo && userInfo.token}` } }
      );

      dispatch({
        type: subTaskActions.SUBTASK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: subTaskActions.SUBTASK_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsSubTask = (subTaskId) => async (dispatch) => {
  dispatch({
    type: subTaskActions.SUBTASK_DETAILS_REQUEST,
    payload: subTaskId,
  });
  try {
    const { data } = await axios.get(`${url}/api/subTasks/${subTaskId}`);
    dispatch({
      type: subTaskActions.SUBTASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: subTaskActions.SUBTASK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSubTask = (subTask) => async (dispatch, getState) => {
  dispatch({
    type: subTaskActions.SUBTASK_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/subTasks/`,
      { subTask },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: subTaskActions.SUBTASK_CREATE_SUCCESS,
      payload: data.subTask,
    });
  } catch (error) {
    dispatch({
      type: subTaskActions.SUBTASK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSubTask = (subTask) => async (dispatch, getState) => {
  dispatch({
    type: subTaskActions.SUBTASK_UPDATE_REQUEST,
    payload: subTask,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      `${url}/api/subTasks/${subTask.itemID}`,
      subTask,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: subTaskActions.SUBTASK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: subTaskActions.SUBTASK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubTask = (subTaskId) => async (dispatch, getState) => {
  dispatch({
    type: subTaskActions.SUBTASK_DELETE_REQUEST,
    payload: subTaskId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/subTasks/${subTaskId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: subTaskActions.SUBTASK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: subTaskActions.SUBTASK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
