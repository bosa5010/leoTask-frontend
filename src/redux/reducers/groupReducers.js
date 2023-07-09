import * as groupActions from "../constants/groupConstants";

export const groupListReducer = (
  state = { loading: true, group: [] },
  action
) => {
  switch (action.type) {
    case groupActions.GROUP_LIST_REQUEST:
      return { loading: true };
    case groupActions.GROUP_LIST_SUCCESS:
      return {
        loading: false,
        groups: action.payload.groups,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case groupActions.GROUP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case groupActions.GROUP_DETAILS_REQUEST:
      return { loading: true };
    case groupActions.GROUP_DETAILS_SUCCESS:
      return { loading: false, group: action.payload };
    case groupActions.GROUP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case groupActions.GROUP_CREATE_REQUEST:
      return { loading: true };
    case groupActions.GROUP_CREATE_SUCCESS:
      return { loading: false, success: true, group: action.payload };
    case groupActions.GROUP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case groupActions.GROUP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const groupUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case groupActions.GROUP_UPDATE_REQUEST:
      return { loading: true };
    case groupActions.GROUP_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case groupActions.GROUP_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case groupActions.GROUP_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const groupDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case groupActions.GROUP_DELETE_REQUEST:
      return { loading: true };
    case groupActions.GROUP_DELETE_SUCCESS:
      return { loading: false, success: true };
    case groupActions.GROUP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case groupActions.GROUP_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
