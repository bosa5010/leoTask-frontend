import axios from "axios";
import { url } from "../api/index";
import * as appointmentActions from "../constants/appointmentConstants";

export const listAppointments =
  ({
    text = "",
    pageNumber = "",
    pageSize = "",
    firstDate = "",
    lastDate = "",
    users = "",
  }) =>
  async (dispatch, getState) => {
    dispatch({
      type: appointmentActions.APPOINTMENT_LIST_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/appointments?pageNumber=${pageNumber}&pageSize=${pageSize}&text=${text}&firstDate=${firstDate}&lastDate=${lastDate}&users=${users}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: appointmentActions.APPOINTMENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: appointmentActions.APPOINTMENT_LIST_FAIL,
        payload: error.message,
      });
    }
  };

export const detailsAppointment =
  (appointmentId) => async (dispatch, getState) => {
    dispatch({
      type: appointmentActions.APPOINTMENT_DETAILS_REQUEST,
      payload: appointmentId,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(
        `${url}/api/appointments/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: appointmentActions.APPOINTMENT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: appointmentActions.APPOINTMENT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createAppointment =
  (appointment) => async (dispatch, getState) => {
    dispatch({
      type: appointmentActions.APPOINTMENT_CREATE_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        `${url}/api/appointments/`,
        { appointment },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: appointmentActions.APPOINTMENT_CREATE_SUCCESS,
        payload: data.appointment,
      });
    } catch (error) {
      dispatch({
        type: appointmentActions.APPOINTMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createManyAppointments =
  (appointments) => async (dispatch, getState) => {
    dispatch({
      type: appointmentActions.APPOINTMENT_CREATEMANY_REQUEST,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        `${url}/api/appointments/many`,
        { appointments },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: appointmentActions.APPOINTMENT_CREATEMANY_SUCCESS,
        payload: data.appointment,
      });
    } catch (error) {
      dispatch({
        type: appointmentActions.APPOINTMENT_CREATEMANY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateAppointment =
  (appointment) => async (dispatch, getState) => {
    dispatch({
      type: appointmentActions.APPOINTMENT_UPDATE_REQUEST,
      payload: appointment,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `${url}/api/appointments/${appointment._id}`,
        appointment,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: appointmentActions.APPOINTMENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: appointmentActions.APPOINTMENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteAppointment =
  (appointmentId) => async (dispatch, getState) => {
    dispatch({
      type: appointmentActions.APPOINTMENT_DELETE_REQUEST,
      payload: appointmentId,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(
        `${url}/api/appointments/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: appointmentActions.APPOINTMENT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: appointmentActions.APPOINTMENT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
