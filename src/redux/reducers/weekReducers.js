import * as weekActions from "../constants/weekConstants";

export const weekListReducer = (
  state = { loading: true, weeks: [] },
  action
) => {
  switch (action.type) {
    case weekActions.WEEK_LIST_REQUEST:
      return { loading: true };
    case weekActions.WEEK_LIST_SUCCESS:
      return {
        loading: false,
        weeks: action.payload.weeks,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case weekActions.WEEK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const weekDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case weekActions.WEEK_DETAILS_REQUEST:
      return { loading: true };
    case weekActions.WEEK_DETAILS_SUCCESS:
      return { loading: false, week: action.payload };
    case weekActions.WEEK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const weekCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case weekActions.WEEK_CREATE_REQUEST:
      return { loading: true };
    case weekActions.WEEK_CREATE_SUCCESS:
      return { loading: false, success: true, week: action.payload };
    case weekActions.WEEK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case weekActions.WEEK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const weekCreateManyReducer = (state = {}, action) => {
  switch (action.type) {
    case weekActions.WEEK_CREATEMANY_REQUEST:
      return { loading: true };
    case weekActions.WEEK_CREATEMANY_SUCCESS:
      return { loading: false, success: true, week: action.payload };
    case weekActions.WEEK_CREATEMANY_FAIL:
      return { loading: false, error: action.payload };
    case weekActions.WEEK_CREATEMANY_RESET:
      return {};
    default:
      return state;
  }
};

export const weekUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case weekActions.WEEK_UPDATE_REQUEST:
      return { loading: true };
    case weekActions.WEEK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case weekActions.WEEK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case weekActions.WEEK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const weekDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case weekActions.WEEK_DELETE_REQUEST:
      return { loading: true };
    case weekActions.WEEK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case weekActions.WEEK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case weekActions.WEEK_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
