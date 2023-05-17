import * as itemActions from "../constants/itemConstants";

export const itemListReducer = (
  state = { loading: true, items: [] },
  action
) => {
  switch (action.type) {
    case itemActions.ITEM_LIST_REQUEST:
      return { loading: true };
    case itemActions.ITEM_LIST_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case itemActions.ITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case itemActions.ITEM_DETAILS_REQUEST:
      return { loading: true };
    case itemActions.ITEM_DETAILS_SUCCESS:
      return { loading: false, item: action.payload };
    case itemActions.ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case itemActions.ITEM_CREATE_REQUEST:
      return { loading: true };
    case itemActions.ITEM_CREATE_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case itemActions.ITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case itemActions.ITEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case itemActions.ITEM_UPDATE_REQUEST:
      return { loading: true };
    case itemActions.ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case itemActions.ITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case itemActions.ITEM_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case itemActions.ITEM_DELETE_REQUEST:
      return { loading: true };
    case itemActions.ITEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case itemActions.ITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case itemActions.ITEM_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
