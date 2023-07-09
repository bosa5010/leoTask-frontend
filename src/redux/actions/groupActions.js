import axios from "axios";
import { url } from "../api/index";
import * as groupActions from "../constants/groupConstants";

export const listGroups =
  ({ name = "", team = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: groupActions.GROUP_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/groups?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&team=${team}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: groupActions.GROUP_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: groupActions.GROUP_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsGroup = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: groupActions.GROUP_DETAILS_REQUEST,
    payload: groupId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`${url}/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: groupActions.GROUP_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: groupActions.GROUP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGroup = (group) => async (dispatch, getState) => {
  dispatch({
    type: groupActions.GROUP_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/groups/`,
      { group },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: groupActions.GROUP_CREATE_SUCCESS,
      payload: data.group,
    });
  } catch (error) {
    dispatch({
      type: groupActions.GROUP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateGroup = (group) => async (dispatch, getState) => {
  dispatch({
    type: groupActions.GROUP_UPDATE_REQUEST,
    payload: group,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/groups/${group._id}`, group, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: groupActions.GROUP_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: groupActions.GROUP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteGroup = (groupId) => async (dispatch, getState) => {
  dispatch({
    type: groupActions.GROUP_DELETE_REQUEST,
    payload: groupId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: groupActions.GROUP_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: groupActions.GROUP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
