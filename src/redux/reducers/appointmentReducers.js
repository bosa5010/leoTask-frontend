import * as appointmentActions from "../constants/appointmentConstants";

export const appointmentListReducer = (
  state = { loading: true, appointments: [] },
  action
) => {
  switch (action.type) {
    case appointmentActions.APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case appointmentActions.APPOINTMENT_LIST_SUCCESS:
      return {
        loading: false,
        appointments: action.payload.appointments,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case appointmentActions.APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case appointmentActions.APPOINTMENT_DETAILS_REQUEST:
      return { loading: true };
    case appointmentActions.APPOINTMENT_DETAILS_SUCCESS:
      return { loading: false, appointment: action.payload };
    case appointmentActions.APPOINTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case appointmentActions.APPOINTMENT_CREATE_REQUEST:
      return { loading: true };
    case appointmentActions.APPOINTMENT_CREATE_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case appointmentActions.APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case appointmentActions.APPOINTMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentCreateManyReducer = (state = {}, action) => {
  switch (action.type) {
    case appointmentActions.APPOINTMENT_CREATEMANY_REQUEST:
      return { loading: true };
    case appointmentActions.APPOINTMENT_CREATEMANY_SUCCESS:
      return { loading: false, success: true, appointment: action.payload };
    case appointmentActions.APPOINTMENT_CREATEMANY_FAIL:
      return { loading: false, error: action.payload };
    case appointmentActions.APPOINTMENT_CREATEMANY_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case appointmentActions.APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case appointmentActions.APPOINTMENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case appointmentActions.APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case appointmentActions.APPOINTMENT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case appointmentActions.APPOINTMENT_DELETE_REQUEST:
      return { loading: true };
    case appointmentActions.APPOINTMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case appointmentActions.APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case appointmentActions.APPOINTMENT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
