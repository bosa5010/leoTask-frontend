import * as instanceActions from "../constants/instanceConstants";

export const instanceListReducer = (
  state = { loading: true, instances: [] },
  action
) => {
  switch (action.type) {
    case instanceActions.INSTANCE_LIST_REQUEST:
      return { loading: true };
    case instanceActions.INSTANCE_LIST_SUCCESS:
      return {
        loading: false,
        instances: action.payload.instances,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case instanceActions.INSTANCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const instanceDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case instanceActions.INSTANCE_DETAILS_REQUEST:
      return { loading: true };
    case instanceActions.INSTANCE_DETAILS_SUCCESS:
      return { loading: false, instance: action.payload };
    case instanceActions.INSTANCE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const instanceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case instanceActions.INSTANCE_CREATE_REQUEST:
      return { loading: true };
    case instanceActions.INSTANCE_CREATE_SUCCESS:
      return { loading: false, success: true, instance: action.payload };
    case instanceActions.INSTANCE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case instanceActions.INSTANCE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const instanceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case instanceActions.INSTANCE_UPDATE_REQUEST:
      return { loading: true };
    case instanceActions.INSTANCE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case instanceActions.INSTANCE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case instanceActions.INSTANCE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const instanceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case instanceActions.INSTANCE_DELETE_REQUEST:
      return { loading: true };
    case instanceActions.INSTANCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case instanceActions.INSTANCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case instanceActions.INSTANCE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
