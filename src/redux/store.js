import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as systemReducers from "./reducers/systemReducers";
import * as userReducers from "./reducers/userReducers";
import * as teamReducers from "./reducers/teamReducers";
import * as taskThemeReducers from "./reducers/taskThemeReducers";
import * as taskModelReducers from "./reducers/taskModelReducers";
import * as instanceReducers from "./reducers/instanceReducers";
import * as weekReducers from "./reducers/weekReducers";
import * as statusReducers from "./reducers/statusReducers";
import * as taskReducers from "./reducers/taskReducers";
import * as calenderReducers from "./reducers/calenderReducers";
import * as itemReducers from "./reducers/itemReducers";
import * as itemStatusReducers from "./reducers/itemStatusReducers";
import * as subTaskReducers from "./reducers/subTaskReducers";
import * as stepReducers from "./reducers/stepReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userSignin: userReducers.userSigninReducer,
  userRegister: userReducers.userRegisterReducer,
  userDetails: userReducers.userDetailsReducer,
  userUpdateProfile: userReducers.userUpdateProfileReducer,
  userList: userReducers.userListReducer,
  userDelete: userReducers.userDeleteReducer,
  userUpdate: userReducers.userUpdateReducer,

  taskList: taskReducers.taskListReducer,
  taskDetails: taskReducers.taskDetailsReducer,
  taskCreate: taskReducers.taskCreateReducer,
  tasksCreate: taskReducers.tasksCreateReducer,
  taskUpdate: taskReducers.taskUpdateReducer,
  taskDelete: taskReducers.taskDeleteReducer,

  subTaskList: subTaskReducers.subTaskListReducer,
  subTaskDetails: subTaskReducers.subTaskDetailsReducer,
  subTaskCreate: subTaskReducers.subTaskCreateReducer,
  subTaskUpdate: subTaskReducers.subTaskUpdateReducer,
  subTaskDelete: subTaskReducers.subTaskDeleteReducer,

  calenderList: calenderReducers.calenderListReducer,
  calenderDetails: calenderReducers.calenderDetailsReducer,
  calenderCreate: calenderReducers.calenderCreateReducer,
  calenderUpdate: calenderReducers.calenderUpdateReducer,
  calenderDelete: calenderReducers.calenderDeleteReducer,

  weekList: weekReducers.weekListReducer,
  weekDetails: weekReducers.weekDetailsReducer,
  weekCreate: weekReducers.weekCreateReducer,
  weeksCreate: weekReducers.weekCreateManyReducer,
  weekUpdate: weekReducers.weekUpdateReducer,
  weekDelete: weekReducers.weekDeleteReducer,

  statusList: statusReducers.statusListReducer,
  statusDetails: statusReducers.statusDetailsReducer,
  statusCreate: statusReducers.statusCreateReducer,
  statusUpdate: statusReducers.statusUpdateReducer,
  statusDelete: statusReducers.statusDeleteReducer,

  systemList: systemReducers.systemListReducer,
  systemDetails: systemReducers.systemDetailsReducer,
  systemCreate: systemReducers.systemCreateReducer,
  systemUpdate: systemReducers.systemUpdateReducer,
  systemDelete: systemReducers.systemDeleteReducer,

  instanceList: instanceReducers.instanceListReducer,
  instanceDetails: instanceReducers.instanceDetailsReducer,
  instanceCreate: instanceReducers.instanceCreateReducer,
  instanceUpdate: instanceReducers.instanceUpdateReducer,
  instanceDelete: instanceReducers.instanceDeleteReducer,

  itemList: itemReducers.itemListReducer,
  itemDetails: itemReducers.itemDetailsReducer,
  itemCreate: itemReducers.itemCreateReducer,
  itemUpdate: itemReducers.itemUpdateReducer,
  itemDelete: itemReducers.itemDeleteReducer,

  teamList: teamReducers.teamListReducer,
  teamDetails: teamReducers.teamDetailsReducer,
  teamCreate: teamReducers.teamCreateReducer,
  teamUpdate: teamReducers.teamUpdateReducer,
  teamDelete: teamReducers.teamDeleteReducer,

  taskThemeList: taskThemeReducers.taskThemeListReducer,
  taskThemeFrozenList: taskThemeReducers.taskThemeListFrozenReducer,
  taskThemeDetails: taskThemeReducers.taskThemeDetailsReducer,
  taskThemeCreate: taskThemeReducers.taskThemeCreateReducer,
  taskThemeUpdate: taskThemeReducers.taskThemeUpdateReducer,
  taskThemeDelete: taskThemeReducers.taskThemeDeleteReducer,

  taskModelList: taskModelReducers.taskModelListReducer,
  taskModelFrozenList: taskModelReducers.taskModelFrozenListReducer,
  taskModelDetails: taskModelReducers.taskModelDetailsReducer,
  taskModelCreate: taskModelReducers.taskModelCreateReducer,
  taskModelUpdate: taskModelReducers.taskModelUpdateReducer,
  taskModelDelete: taskModelReducers.taskModelDeleteReducer,

  stepList: stepReducers.stepListReducer,
  stepDetails: stepReducers.stepDetailsReducer,
  stepCreate: stepReducers.stepCreateReducer,
  stepUpdate: stepReducers.stepUpdateReducer,
  stepDelete: stepReducers.stepDeleteReducer,

  itemStatusList: itemStatusReducers.itemStatusListReducer,
  itemStatusDetails: itemStatusReducers.itemStatusDetailsReducer,
  itemStatusCreate: itemStatusReducers.itemStatusCreateReducer,
  itemStatusUpdate: itemStatusReducers.itemStatusUpdateReducer,
  itemStatusDelete: itemStatusReducers.itemStatusDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
