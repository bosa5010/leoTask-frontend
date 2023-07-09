import * as userActions from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userActions.USER_REGISTER_REQUEST:
      return { loading: true };
    case userActions.USER_REGISTER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case userActions.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case userActions.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case userActions.USER_SIGNIN_REQUEST:
      return { loading: true };
    case userActions.USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userActions.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case userActions.USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case userActions.USER_DETAILS_REQUEST:
      return { loading: true };
    case userActions.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case userActions.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case userActions.USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userActions.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case userActions.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case userActions.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case userActions.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case userActions.USER_UPDATE_REQUEST:
      return { loading: true };
    case userActions.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, message: action.payload.message };
    case userActions.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case userActions.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (
  state = { users: [], loading: true },
  action
) => {
  switch (action.type) {
    case userActions.USER_LIST_REQUEST:
      return { loading: true };
    case userActions.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        pages: action.payload.pages,
      };
    case userActions.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case userActions.USER_DELETE_REQUEST:
      return { loading: true };
    case userActions.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case userActions.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case userActions.USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
