import * as subTaskActions from "../constants/subTaskConstants";

export const subTaskListReducer = (
  state = { loading: true, subTasks: [] },
  action
) => {
  switch (action.type) {
    case subTaskActions.SUBTASK_LIST_REQUEST:
      return { loading: true };
    case subTaskActions.SUBTASK_LIST_SUCCESS:
      return {
        loading: false,
        subTasks: action.payload.subTasks,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case subTaskActions.SUBTASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subTaskDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case subTaskActions.SUBTASK_DETAILS_REQUEST:
      return { loading: true };
    case subTaskActions.SUBTASK_DETAILS_SUCCESS:
      return { loading: false, subTask: action.payload };
    case subTaskActions.SUBTASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subTaskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case subTaskActions.SUBTASK_CREATE_REQUEST:
      return { loading: true };
    case subTaskActions.SUBTASK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        subTask: action.payload.subTask,
        message: action.payload.message,
      };
    case subTaskActions.SUBTASK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case subTaskActions.SUBTASK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const subTaskUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case subTaskActions.SUBTASK_UPDATE_REQUEST:
      return { loading: true };
    case subTaskActions.SUBTASK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case subTaskActions.SUBTASK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case subTaskActions.SUBTASK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const subTaskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case subTaskActions.SUBTASK_DELETE_REQUEST:
      return { loading: true };
    case subTaskActions.SUBTASK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case subTaskActions.SUBTASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case subTaskActions.SUBTASK_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
