import * as statusActions from "../constants/statusConstants";

export const statusListReducer = (
  state = { loading: true, status: [] },
  action
) => {
  switch (action.type) {
    case statusActions.STATUS_LIST_REQUEST:
      return { loading: true };
    case statusActions.STATUS_LIST_SUCCESS:
      return {
        loading: false,
        status: action.payload.status,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case statusActions.STATUS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const statusDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case statusActions.STATUS_DETAILS_REQUEST:
      return { loading: true };
    case statusActions.STATUS_DETAILS_SUCCESS:
      return { loading: false, status: action.payload };
    case statusActions.STATUS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const statusCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case statusActions.STATUS_CREATE_REQUEST:
      return { loading: true };
    case statusActions.STATUS_CREATE_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case statusActions.STATUS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case statusActions.STATUS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const statusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case statusActions.STATUS_UPDATE_REQUEST:
      return { loading: true };
    case statusActions.STATUS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case statusActions.STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case statusActions.STATUS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const statusDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case statusActions.STATUS_DELETE_REQUEST:
      return { loading: true };
    case statusActions.STATUS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case statusActions.STATUS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case statusActions.STATUS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
