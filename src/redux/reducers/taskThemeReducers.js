import * as taskThemeActions from "../constants/taskThemeConstants";

export const taskThemeListReducer = (
  state = { loading: true, taskThemes: [] },
  action
) => {
  switch (action.type) {
    case taskThemeActions.TASKTHEME_LIST_REQUEST:
      return { loading: true };
    case taskThemeActions.TASKTHEME_LIST_SUCCESS:
      return {
        loading: false,
        taskThemes: action.payload.taskThemes,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case taskThemeActions.TASKTHEME_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskThemeListFrozenReducer = (
  state = { loading: true, taskThemes: [] },
  action
) => {
  switch (action.type) {
    case taskThemeActions.TASKTHEME_FROZEN_LIST_REQUEST:
      return { loading: true };
    case taskThemeActions.TASKTHEME_FROZEN_LIST_SUCCESS:
      return {
        loading: false,
        taskThemes: action.payload.taskThemes,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case taskThemeActions.TASKTHEME_FROZEN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskThemeDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case taskThemeActions.TASKTHEME_DETAILS_REQUEST:
      return { loading: true };
    case taskThemeActions.TASKTHEME_DETAILS_SUCCESS:
      return { loading: false, taskTheme: action.payload };
    case taskThemeActions.TASKTHEME_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskThemeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case taskThemeActions.TASKTHEME_CREATE_REQUEST:
      return { loading: true };
    case taskThemeActions.TASKTHEME_CREATE_SUCCESS:
      return { loading: false, success: true, taskTheme: action.payload };
    case taskThemeActions.TASKTHEME_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case taskThemeActions.TASKTHEME_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskThemeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case taskThemeActions.TASKTHEME_UPDATE_REQUEST:
      return { loading: true };
    case taskThemeActions.TASKTHEME_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case taskThemeActions.TASKTHEME_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case taskThemeActions.TASKTHEME_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskThemeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case taskThemeActions.TASKTHEME_DELETE_REQUEST:
      return { loading: true };
    case taskThemeActions.TASKTHEME_DELETE_SUCCESS:
      return { loading: false, success: true };
    case taskThemeActions.TASKTHEME_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case taskThemeActions.TASKTHEME_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
