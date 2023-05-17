import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RegisterScreen from "./screens/users/RegisterScreen";
import ProfileScreen from "./screens/users/ProfileScreen";
import UserListScreen from "./screens/users/UserListScreen";
import UserEditScreen from "./screens/users/UserEditScreen";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import TeamScreen from "./screens/settings/TeamScreen";
import TaskThemeScreen from "./screens/settings/TaskThemeScreen";
import TaskModelScreen from "./screens/settings/TaskModelScreen";
import SystemScreen from "./screens/settings/SystemScreen ";
import InstanceScreen from "./screens/settings/instanceScreen";
import WeekScreen from "./screens/settings/WeekScreen";
import StatusScreen from "./screens/settings/StatusScreen";
import TaskListScreen from "./screens/tasks/TaskListScreen";
import TaskEditScreen from "./screens/tasks/TaskEditScreen";
import CalenderScreen from "./screens/settings/CalenderScreen";
import ItemScreen from "./screens/settings/ItemScreen";
import ItemStatusScreen from "./screens/settings/ItemStatusScreen";
import SubTaskEditScreen from "./screens/tasks/SubTaskEditScreen";
import TasksListScreen from "./screens/tasks/TasksListScreen";
import StepScreen from "./screens/settings/stepScreen";
import SubTasksListScreen from "./screens/tasks/SubTasksListScreen";
import SuperAdminRoute from "./components/SuperAdminRoute";
import SigninScreen from "./screens/users/SigninScreen";
import TaskModelEditScreen from "./screens/settings/TaskModelEditScreen";
import InstanceEditScreen from "./screens/settings/InstanceEditScreen";
import ItemEditScreen from "./screens/settings/ItemEditScreen";
import StepEditScreen from "./screens/settings/StepEditScreen";
import WeekEditScreen from "./screens/settings/WeekEditScreen";
import CalenderEditScreen from "./screens/settings/CalenderEditScreen";
import TasksEditScreen from "./screens/tasks/TasksEditScreen";
import WeeksEditScreen from "./screens/settings/WeeksEditScreen";

function App(props) {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <TopBar />
        </header>
        <main>
          <div className="row top" style={{ width: "100%" }}>
            <div className="sidebar" style={{ width: "20%" }}>
              <SideBar props={props} />
            </div>
            <div className="home" style={{ width: "80%" }}>
              {/* User Routes */}
              <Route path="/signin" component={SigninScreen} exact />

              <PrivateRoute
                path="/taskslist"
                component={TasksListScreen}
                exact
              />
              <PrivateRoute
                path="/taskslist/:reference"
                component={TasksListScreen}
                exact
              />
              <PrivateRoute
                path="/tasks/:taskmodelid/:taskmodelname/list"
                component={TasksListScreen}
                exact
              />
              <PrivateRoute
                path="/tasks/:userid/:username/mytasks"
                component={TasksListScreen}
                exact
              />
              <PrivateRoute path="/" component={TasksListScreen} exact />
              <PrivateRoute
                path="/taskcreate"
                component={TaskEditScreen}
                exact
              />
              <PrivateRoute
                path="/subtaskcreate"
                component={SubTaskEditScreen}
                exact
              />

              <PrivateRoute
                path="/subtask/:id/edit"
                component={SubTaskEditScreen}
                exact
              />
              <PrivateRoute
                path="/subtask/:reference"
                component={SubTaskEditScreen}
                exact
              />
              <PrivateRoute
                path="/subtasklist"
                component={SubTasksListScreen}
                exact
              />

              {/* Admin Routes */}
              <AdminRoute path="/tasklist" component={TaskListScreen} exact />
              <AdminRoute
                path="/task/:id/edit"
                component={TaskEditScreen}
                exact
              />
              <AdminRoute
                path="/tasks/:id/edit"
                component={TasksEditScreen}
                exact
              />
              <AdminRoute
                path="/taskmodel/:id/edit"
                component={TaskModelEditScreen}
                exact
              />
              <AdminRoute
                path="/tasklist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={TaskListScreen}
                exact
              />
              <AdminRoute
                path="/tasklist/pageNumber/:pageNumber/pageSize/:pageSize/description/:description"
                component={TaskListScreen}
                exact
              />
              <AdminRoute path="/steplist" component={StepScreen} exact />
              <AdminRoute
                path="/step/:id/edit"
                component={StepEditScreen}
                exact
              />
              <AdminRoute
                path="/steplist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={StepScreen}
                exact
              />
              <AdminRoute path="/itemlist" component={ItemScreen} exact />
              <AdminRoute
                path="/itemlist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={ItemScreen}
                exact
              />
              <AdminRoute
                path="/item/:id/edit"
                component={ItemEditScreen}
                exact
              />
              <AdminRoute
                path="/itemStatuslist"
                component={ItemStatusScreen}
                exact
              />
              <AdminRoute
                path="/itemStatuslist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={ItemStatusScreen}
                exact
              />
              <AdminRoute
                path="/taskthemelist"
                component={TaskThemeScreen}
                exact
              />
              <AdminRoute
                path="/taskthemelist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={TaskThemeScreen}
                exact
              />
              <AdminRoute
                path="/taskmodelist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={TaskModelScreen}
                exact
              />
              <AdminRoute
                path="/taskmodelist"
                component={TaskModelScreen}
                exact
              />
              <AdminRoute
                path="/calenderlist"
                component={CalenderScreen}
                exact
              />
              <AdminRoute
                path="/calender/:id/edit"
                component={CalenderEditScreen}
                exact
              />

              {/* Super Admin Routes */}
              <SuperAdminRoute path="/register" component={RegisterScreen} />
              <PrivateRoute path="/profile" component={ProfileScreen} />
              <SuperAdminRoute
                path="/userlist"
                component={UserListScreen}
                exact
              />
              <SuperAdminRoute
                path="/userlist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={UserListScreen}
              />
              <SuperAdminRoute
                path="/user/:id/edit"
                component={UserEditScreen}
              />

              <SuperAdminRoute path="/teamlist" component={TeamScreen} exact />
              <SuperAdminRoute
                path="/teamlist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={TeamScreen}
                exact
              />
              <SuperAdminRoute
                path="/systemlist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={SystemScreen}
                exact
              />
              <SuperAdminRoute
                path="/systemlist"
                component={SystemScreen}
                exact
              />

              <SuperAdminRoute
                path="/instancelist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={InstanceScreen}
                exact
              />
              <SuperAdminRoute
                path="/instancelist"
                component={InstanceScreen}
                exact
              />
              <SuperAdminRoute
                path="/instance/:id/edit"
                component={InstanceEditScreen}
                exact
              />
              <SuperAdminRoute
                path="/statuslist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={StatusScreen}
                exact
              />
              <SuperAdminRoute
                path="/statuslist"
                component={StatusScreen}
                exact
              />
              <SuperAdminRoute
                path="/weeklist/pageNumber/:pageNumber/pageSize/:pageSize"
                component={WeekScreen}
                exact
              />
              <SuperAdminRoute
                path="/week/:id/edit"
                component={WeekEditScreen}
              />
              <SuperAdminRoute
                path="/weeks/:id/edit"
                component={WeeksEditScreen}
              />
              <SuperAdminRoute path="/weeklist" component={WeekScreen} exact />
              <SuperAdminRoute
                path="/dashboard"
                component={DashboardScreen}
                exact
              />
            </div>
          </div>
        </main>
        <footer className="row center">© All Rights Reserved 2023</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
