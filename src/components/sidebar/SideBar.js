import React, { useEffect, useRef, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaChartBar, FaBars, FaTasks } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { MdAddTask } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";

import "./sidbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { frozenListTaskModels } from "../../redux/actions/taskModelActions";
import { frozenListTaskThemes } from "../../redux/actions/taskThemeActions";
import { objectId } from "../../utils";

const SideBar = ({ props }) => {
  const iconSize = 15;
  const [collapsed, setCollapsed] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const taskModelFrozenList = useSelector((state) => state.taskModelFrozenList);
  const { taskModels } = taskModelFrozenList;

  const taskThemeFrozenList = useSelector((state) => state.taskThemeFrozenList);
  const { taskThemes } = taskThemeFrozenList;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(
        frozenListTaskThemes({
          pageNumber: 1,
          pageSize: 50,
          teams:
            userInfo?.managedTeams?.length > 0
              ? objectId(userInfo?.managedTeams)
              : userInfo?.team?._id,
        })
      );

      dispatch(
        frozenListTaskModels({
          pageNumber: 1,
          pageSize: 50,
          groups: objectId(userInfo?.groups),
        })
      );
    }
  }, [userInfo, dispatch]);

  const myRef = useRef();

  return (
    <ProSidebar collapsed={collapsed} breakPoint="md">
      <SidebarHeader>
        <div ref={myRef} />

        <Menu
          iconShape="circle"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <MenuItem icon={<FaBars />}>
            {!collapsed && (
              <div
                style={{
                  padding: "10px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: "1px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              >
                {userInfo ? userInfo.name : "Connexion"}
              </div>
            )}
          </MenuItem>
        </Menu>
      </SidebarHeader>

      <SidebarContent
        onClick={() => {
          window.scrollTo({
            behavior: "smooth",
            top: myRef.current.offsetTop,
          });
        }}
      >
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaChartBar size={iconSize} />}
            suffix={<span className="badge red">new</span>}
            onClick={() => {
              setCollapsed(true);
            }}
          >
            <Link to="/dashboard">Dashboard</Link>
          </MenuItem>
          <MenuItem icon={<MdGroups size={25} />}>
            <Link to="/">My Group Tasks</Link>
          </MenuItem>
          <MenuItem icon={<BsFillPersonFill size={20} />}>
            <Link
              to={`/tasks/${userInfo && userInfo._id}/${
                userInfo && userInfo.name
              }/mytasks`}
            >
              My Tasks
            </Link>
          </MenuItem>

          {taskThemes?.map((taskTheme, index) => (
            <SubMenu
              title={taskTheme.name}
              icon={<FaTasks size={iconSize} />}
              key={index}
            >
              {taskModels?.map(
                (taskModel, index) =>
                  taskModel.taskTheme._id === taskTheme._id && (
                    <MenuItem key={index}>
                      <Link
                        to={`/tasks/${taskModel._id}/${taskModel.name}/list`}
                      >
                        {taskModel.name}
                      </Link>
                    </MenuItem>
                  )
              )}
            </SubMenu>
          ))}
        </Menu>
        <Menu iconShape="circle">
          {userInfo?.isAdmin && (
            <MenuItem icon={<MdAddTask size={iconSize} />}>
              <Link to="/tasklist">Tasks</Link>
            </MenuItem>
          )}
          <MenuItem icon={<TbSubtask size={iconSize} />}>
            <Link to="/subtasklist">Tasks Feedback</Link>
          </MenuItem>
        </Menu>
        {userInfo?.isAdmin && (
          <Menu iconShape="circle">
            <SubMenu
              title={"Parametres"}
              icon={<AiTwotoneSetting size={iconSize} />}
            >
              <MenuItem>
                <Link to="/calenderlist">Calender</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/instancelist">Instance</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/itemlist">Item</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/itemStatuslist">Item Status</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/statuslist">Status</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/systemlist">Systems</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/taskmodelist">Task Model</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/steplist">Task Model Steps</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/taskthemelist">Task Theme</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/teamlist">Teams</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/grouplist">Groups</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/userlist">Users</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/weeklist">Week</Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        )}
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "8px",
          }}
        >
          {userInfo && userInfo.isSuperAdmin ? (
            <h3>Super Admin</h3>
          ) : userInfo && userInfo.isAdmin ? (
            <h3>Admin</h3>
          ) : (
            <h3>User</h3>
          )}
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBar;
