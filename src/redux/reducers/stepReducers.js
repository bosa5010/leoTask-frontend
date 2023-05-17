import * as stepActions from "../constants/stepConstants";

export const stepListReducer = (
  state = { loading: true, steps: [] },
  action
) => {
  switch (action.type) {
    case stepActions.STEP_LIST_REQUEST:
      return { loading: true };
    case stepActions.STEP_LIST_SUCCESS:
      return {
        loading: false,
        steps: action.payload.steps,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case stepActions.STEP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stepDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case stepActions.STEP_DETAILS_REQUEST:
      return { loading: true };
    case stepActions.STEP_DETAILS_SUCCESS:
      return { loading: false, step: action.payload };
    case stepActions.STEP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stepCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case stepActions.STEP_CREATE_REQUEST:
      return { loading: true };
    case stepActions.STEP_CREATE_SUCCESS:
      return { loading: false, success: true, step: action.payload };
    case stepActions.STEP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case stepActions.STEP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stepUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case stepActions.STEP_UPDATE_REQUEST:
      return { loading: true };
    case stepActions.STEP_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case stepActions.STEP_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case stepActions.STEP_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const stepDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case stepActions.STEP_DELETE_REQUEST:
      return { loading: true };
    case stepActions.STEP_DELETE_SUCCESS:
      return { loading: false, success: true };
    case stepActions.STEP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case stepActions.STEP_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
