import * as itemStatusActions from "../constants/itemStatusConstants";

export const itemStatusListReducer = (
  state = { loading: true, itemStatuss: [] },
  action
) => {
  switch (action.type) {
    case itemStatusActions.ITEMSTATUS_LIST_REQUEST:
      return { loading: true };
    case itemStatusActions.ITEMSTATUS_LIST_SUCCESS:
      return {
        loading: false,
        itemStatuss: action.payload.itemStatuss,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case itemStatusActions.ITEMSTATUS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemStatusDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case itemStatusActions.ITEMSTATUS_DETAILS_REQUEST:
      return { loading: true };
    case itemStatusActions.ITEMSTATUS_DETAILS_SUCCESS:
      return { loading: false, itemStatus: action.payload };
    case itemStatusActions.ITEMSTATUS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemStatusCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case itemStatusActions.ITEMSTATUS_CREATE_REQUEST:
      return { loading: true };
    case itemStatusActions.ITEMSTATUS_CREATE_SUCCESS:
      return { loading: false, success: true, itemStatus: action.payload };
    case itemStatusActions.ITEMSTATUS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case itemStatusActions.ITEMSTATUS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemStatusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case itemStatusActions.ITEMSTATUS_UPDATE_REQUEST:
      return { loading: true };
    case itemStatusActions.ITEMSTATUS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case itemStatusActions.ITEMSTATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case itemStatusActions.ITEMSTATUS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemStatusDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case itemStatusActions.ITEMSTATUS_DELETE_REQUEST:
      return { loading: true };
    case itemStatusActions.ITEMSTATUS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case itemStatusActions.ITEMSTATUS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case itemStatusActions.ITEMSTATUS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
