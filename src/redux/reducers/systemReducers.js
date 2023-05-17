import * as systemActions from "../constants/systemConstants";

export const systemListReducer = (
  state = { loading: true, systems: [] },
  action
) => {
  switch (action.type) {
    case systemActions.SYSTEM_LIST_REQUEST:
      return { loading: true };
    case systemActions.SYSTEM_LIST_SUCCESS:
      return {
        loading: false,
        systems: action.payload.systems,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case systemActions.SYSTEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const systemDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case systemActions.SYSTEM_DETAILS_REQUEST:
      return { loading: true };
    case systemActions.SYSTEM_DETAILS_SUCCESS:
      return { loading: false, system: action.payload };
    case systemActions.SYSTEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const systemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case systemActions.SYSTEM_CREATE_REQUEST:
      return { loading: true };
    case systemActions.SYSTEM_CREATE_SUCCESS:
      return { loading: false, success: true, system: action.payload };
    case systemActions.SYSTEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case systemActions.SYSTEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const systemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case systemActions.SYSTEM_UPDATE_REQUEST:
      return { loading: true };
    case systemActions.SYSTEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case systemActions.SYSTEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case systemActions.SYSTEM_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const systemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case systemActions.SYSTEM_DELETE_REQUEST:
      return { loading: true };
    case systemActions.SYSTEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case systemActions.SYSTEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case systemActions.SYSTEM_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
