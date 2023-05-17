import * as calenderActions from "../constants/calenderConstants";

export const calenderListReducer = (
  state = { loading: true, calenders: [] },
  action
) => {
  switch (action.type) {
    case calenderActions.CALENDER_LIST_REQUEST:
      return { loading: true };
    case calenderActions.CALENDER_LIST_SUCCESS:
      return {
        loading: false,
        calenders: action.payload.calenders,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case calenderActions.CALENDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const calenderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case calenderActions.CALENDER_DETAILS_REQUEST:
      return { loading: true };
    case calenderActions.CALENDER_DETAILS_SUCCESS:
      return { loading: false, calender: action.payload };
    case calenderActions.CALENDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const calenderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case calenderActions.CALENDER_CREATE_REQUEST:
      return { loading: true };
    case calenderActions.CALENDER_CREATE_SUCCESS:
      return { loading: false, success: true, calender: action.payload };
    case calenderActions.CALENDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case calenderActions.CALENDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const calenderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case calenderActions.CALENDER_UPDATE_REQUEST:
      return { loading: true };
    case calenderActions.CALENDER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case calenderActions.CALENDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case calenderActions.CALENDER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const calenderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case calenderActions.CALENDER_DELETE_REQUEST:
      return { loading: true };
    case calenderActions.CALENDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case calenderActions.CALENDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case calenderActions.CALENDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
