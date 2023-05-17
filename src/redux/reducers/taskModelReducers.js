import * as taskModelActions from "../constants/taskModelConstants";

export const taskModelListReducer = (
  state = { loading: true, taskModels: [] },
  action
) => {
  switch (action.type) {
    case taskModelActions.TASKMODEL_LIST_REQUEST:
      return { loading: true };
    case taskModelActions.TASKMODEL_LIST_SUCCESS:
      return {
        loading: false,
        taskModels: action.payload.taskModels,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case taskModelActions.TASKMODEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskModelFrozenListReducer = (
  state = { loading: true, taskModels: [] },
  action
) => {
  switch (action.type) {
    case taskModelActions.TASKMODEL_FROZEN_LIST_REQUEST:
      return { loading: true };
    case taskModelActions.TASKMODEL_FROZEN_LIST_SUCCESS:
      return {
        loading: false,
        taskModels: action.payload.taskModels,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case taskModelActions.TASKMODEL_FROZEN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskModelDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case taskModelActions.TASKMODEL_DETAILS_REQUEST:
      return { loading: true };
    case taskModelActions.TASKMODEL_DETAILS_SUCCESS:
      return { loading: false, taskModel: action.payload };
    case taskModelActions.TASKMODEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const taskModelCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case taskModelActions.TASKMODEL_CREATE_REQUEST:
      return { loading: true };
    case taskModelActions.TASKMODEL_CREATE_SUCCESS:
      return { loading: false, success: true, taskModel: action.payload };
    case taskModelActions.TASKMODEL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case taskModelActions.TASKMODEL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskModelUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case taskModelActions.TASKMODEL_UPDATE_REQUEST:
      return { loading: true };
    case taskModelActions.TASKMODEL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case taskModelActions.TASKMODEL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case taskModelActions.TASKMODEL_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const taskModelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case taskModelActions.TASKMODEL_DELETE_REQUEST:
      return { loading: true };
    case taskModelActions.TASKMODEL_DELETE_SUCCESS:
      return { loading: false, success: true };
    case taskModelActions.TASKMODEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case taskModelActions.TASKMODEL_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
