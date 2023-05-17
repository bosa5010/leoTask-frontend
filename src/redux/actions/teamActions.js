import axios from "axios";
import { url } from "../api/index";
import * as teamActions from "../constants/teamConstants";

export const listTeams =
  ({ name = "", pageNumber = "", pageSize = "" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: teamActions.TEAM_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/teams?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: teamActions.TEAM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: teamActions.TEAM_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsTeam = (teamId) => async (dispatch) => {
  dispatch({
    type: teamActions.TEAM_DETAILS_REQUEST,
    payload: teamId,
  });
  try {
    const { data } = await axios.get(`${url}/api/teams/${teamId}`);
    dispatch({
      type: teamActions.TEAM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: teamActions.TEAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTeam = (team) => async (dispatch, getState) => {
  dispatch({
    type: teamActions.TEAM_CREATE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.post(
      `${url}/api/teams/`,
      { team },
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({
      type: teamActions.TEAM_CREATE_SUCCESS,
      payload: data.team,
    });
  } catch (error) {
    dispatch({
      type: teamActions.TEAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTeam = (team) => async (dispatch, getState) => {
  dispatch({
    type: teamActions.TEAM_UPDATE_REQUEST,
    payload: team,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`${url}/api/teams/${team._id}`, team, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: teamActions.TEAM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: teamActions.TEAM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTeam = (teamId) => async (dispatch, getState) => {
  dispatch({
    type: teamActions.TEAM_DELETE_REQUEST,
    payload: teamId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`${url}/api/teams/${teamId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: teamActions.TEAM_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: teamActions.TEAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
