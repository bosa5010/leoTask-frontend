import * as teamActions from "../constants/teamConstants";

export const teamListReducer = (
  state = { loading: true, teams: [] },
  action
) => {
  switch (action.type) {
    case teamActions.TEAM_LIST_REQUEST:
      return { loading: true };
    case teamActions.TEAM_LIST_SUCCESS:
      return {
        loading: false,
        teams: action.payload.teams,
        pages: action.payload.pages,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
      };
    case teamActions.TEAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case teamActions.TEAM_DETAILS_REQUEST:
      return { loading: true };
    case teamActions.TEAM_DETAILS_SUCCESS:
      return { loading: false, team: action.payload };
    case teamActions.TEAM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const teamCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case teamActions.TEAM_CREATE_REQUEST:
      return { loading: true };
    case teamActions.TEAM_CREATE_SUCCESS:
      return { loading: false, success: true, team: action.payload };
    case teamActions.TEAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case teamActions.TEAM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const teamUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case teamActions.TEAM_UPDATE_REQUEST:
      return { loading: true };
    case teamActions.TEAM_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case teamActions.TEAM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case teamActions.TEAM_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const teamDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case teamActions.TEAM_DELETE_REQUEST:
      return { loading: true };
    case teamActions.TEAM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case teamActions.TEAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case teamActions.TEAM_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
