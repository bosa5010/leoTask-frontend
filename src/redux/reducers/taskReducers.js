import * as taskActions from "../constants/taskConstants";

export const taskListReducer = (
  state = { loading: true, tasks: [] },
  action
) => {
  switch (action.type) {
    case taskActions.TASK_LIST_REQUEST:
      return { loading: true };
    case taskActions.TASK_LIST_SUCCESS:
      return {
        loading: false,
        tasks: action.payload.tasks,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };

    case taskActions.TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case taskActions.TASK_DETAILS_REQUEST:
      return { loading: true };
    case taskActions.TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case taskActions.TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case taskActions.TASK_CREATE_REQUEST:
      return { loading: true };
    case taskActions.TASK_CREATE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case taskActions.TASK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case taskActions.TASK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const tasksCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case taskActions.TASKS_CREATE_REQUEST:
      return { loading: true };
    case taskActions.TASKS_CREATE_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case taskActions.TASKS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case taskActions.TASKS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case taskActions.TASK_UPDATE_REQUEST:
      return { loading: true };
    case taskActions.TASK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case taskActions.TASK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case taskActions.TASK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case taskActions.TASK_DELETE_REQUEST:
      return { loading: true };
    case taskActions.TASK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case taskActions.TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case taskActions.TASK_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
