import React, { useCallback, useEffect } from "react";
import "./task.css";

import { useDispatch, useSelector } from "react-redux";
import { listStatuss } from "../../redux/actions/statusActions";
import { listUsers } from "../../redux/actions/userActions";
import { listInstances } from "../../redux/actions/instanceActions";
import { listTaskModels } from "../../redux/actions/taskModelActions";
import ExportTaskToExcel from "../../components/excel/ExportTaskToExcel";
import { BsFilterCircle } from "react-icons/bs";
import { MdOutlineAddTask } from "react-icons/md";
import GridContainer from "../../components/GridContainer";
import ReactSelect from "../../components/react-select/ReactSelect";
import AppDateTimePicker from "../../components/appDateTimePicker/AppDateTimePicker";
import moment from "../../../node_modules/moment/moment";

export default function TaskFilter({
  filter,
  setFilter,
  listStatus,
  setListStatus,
  activeStatus,
  setActiveStatus,
  listTaskModel,
  setLisTaskModel,
  listInstance,
  setListInstance,
  listUser,
  setListUsers,
  firstDate,
  setFirstDate,
  lastDate,
  setLastDate,
  taskModelName = "",
  userInfo = "",
  userName = "",
  dispatchTaskList,
  href = "/",
  createHandler,
}) {
  const taskList = useSelector((state) => state.taskList);
  const { tasks } = taskList;

  const taskModelList = useSelector((state) => state.taskModelList);
  const {
    loading: loadingTaskModel,
    error: errorTaskModel,
    taskModels,
  } = taskModelList;

  const statusList = useSelector((state) => state.statusList);
  const { loading: loadingStatus, error: errorStatus, status } = statusList;

  const instanceList = useSelector((state) => state.instanceList);
  const {
    loading: loadingInstance,
    error: errorInstance,
    instances,
  } = instanceList;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const listOfActiveStatus = useCallback(() => {
    if (status && status.length > 0) {
      var tempoStatus = status.filter(function (el) {
        return el.number <= 2;
      });

      setListStatus(tempoStatus);
      setActiveStatus(tempoStatus);
    }
  }, [status, setListStatus, setActiveStatus]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listStatuss({}));

    dispatch(listUsers({}));

    dispatch(listInstances({}));

    dispatch(listTaskModels({}));
  }, [dispatch]);

  useEffect(() => {
    listOfActiveStatus();
  }, [listOfActiveStatus]);

  const handleChangeStatus = (e) => {
    setListStatus(e.length > 0 ? e : activeStatus);
  };

  const handleInputChange = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 15,
        })
      );
  };

  return (
    <div>
      <div className="row">
        <div className="filter row">
          <h1>
            {userName && "My "}
            {!userName && "Group "} Tasks :
          </h1>
          <input
            type="search"
            id="task"
            onChange={(e) => {
              dispatchTaskList(1, 15, e.target.value, "reference");
            }}
            placeholder="Reference ..."
            autoComplete="off"
            autoFocus
          />
          <input
            type="search"
            id="task"
            onChange={(e) => {
              dispatchTaskList(1, 15, e.target.value, "description");
            }}
            placeholder="Description ..."
            autoComplete="off"
          />
        </div>
        <div className="row">
          <ExportTaskToExcel dataSet={tasks}></ExportTaskToExcel>

          {createHandler && (
            <button
              type="button"
              className="adlButton row"
              onClick={createHandler}
            >
              <MdOutlineAddTask
                style={{ marginRight: "1rem", fontSize: "2rem" }}
              />
              Add Task
            </button>
          )}
        </div>
      </div>
      <div className="row">
        <div className="row">
          <button
            type="button"
            className="adlButton row"
            style={{ marginRight: "1rem" }}
            onClick={() => {
              setFilter(!filter);
            }}
          >
            <BsFilterCircle style={{ fontSize: "2.5rem" }} />
          </button>

          <a href={href} className="link">
            {listStatus &&
              listStatus.length > 0 &&
              ` " Status : ` +
                listStatus.map((item) => {
                  return " " + item.name;
                }) +
                ` " `}
            {taskModelName && `" Task Model : ` + taskModelName + ` " `}
            {userName && `" Responsible User : ` + userName + ` " `}
            {listUser &&
              listUser.length > 0 &&
              `"Responsible Users : ` +
                listUser.map((item) => {
                  return " " + item.name;
                }) +
                ` " `}
            {listInstance &&
              listInstance.length > 0 &&
              `"Instances : ` +
                listInstance.map((item) => {
                  return " " + item.name;
                }) +
                ` " `}

            {listTaskModel &&
              listTaskModel.length > 0 &&
              ` "Task Models : ` +
                listTaskModel.map((item) => {
                  return " " + item.name;
                }) +
                ` " `}
            {firstDate &&
              `" Start Date : ` +
                moment(firstDate).format("ddd DD MM YYYY") +
                ` " `}
            {lastDate &&
              `" End Date : ` +
                moment(lastDate).format("ddd DD MM YYYY") +
                ` " `}
          </a>
        </div>
      </div>
      {filter && (
        <GridContainer title={"Filter"}>
          {!taskModelName && (
            <div className="filterItems">
              <ReactSelect
                setSelectedOptions={setLisTaskModel}
                onInputChange={(e) => {
                  handleInputChange(e, listTaskModels);
                }}
                closeMenuOnSelect={true}
                options={taskModels}
                defaultValue={listTaskModel}
                isMulti={true}
                isSearchable
                name="Task Models :"
                loading={loadingTaskModel}
                error={errorTaskModel}
                placeholder={"Task Models"}
                label={"Task Models :"}
              />
            </div>
          )}
          <div className="filterItems">
            <ReactSelect
              closeMenuOnSelect={true}
              onChange={handleChangeStatus}
              onInputChange={(e) => {
                handleInputChange(e, listStatuss);
              }}
              options={status}
              defaultValue={listStatus}
              isMulti={true}
              isSearchable
              name="Status :"
              loading={loadingStatus}
              error={errorStatus}
              placeholder={"Status"}
              label={"Status : "}
            />
          </div>
          {!userInfo && (
            <div className="filterItems">
              <ReactSelect
                setSelectedOptions={setListUsers}
                onInputChange={(e) => {
                  handleInputChange(e, listUsers);
                }}
                closeMenuOnSelect={true}
                options={users}
                defaultValue={listUser && listUser}
                isMulti={true}
                isSearchable
                name="Responsible User :"
                loading={loadingUser}
                error={errorUser}
                placeholder={"Users"}
                label={"Responsible User : "}
              />
            </div>
          )}
          <div className="filterItems">
            <ReactSelect
              setSelectedOptions={setListInstance}
              onInputChange={(e) => {
                handleInputChange(e, listInstances);
              }}
              closeMenuOnSelect={true}
              options={instances}
              isMulti={true}
              defaultValue={listInstance && listInstance}
              isSearchable
              name="Instances :"
              loading={loadingInstance}
              error={errorInstance}
              placeholder={"Instance"}
              label={"Instance : "}
            />
          </div>
          <div className="filterItems">
            <div className="row">
              <AppDateTimePicker
                selectedDate={firstDate}
                setSelectedDate={setFirstDate}
                label={" Start Date : "}
              />
              <AppDateTimePicker
                selectedDate={lastDate}
                setSelectedDate={setLastDate}
                label={" End Date : "}
              />
            </div>
          </div>
        </GridContainer>
      )}
    </div>
  );
}
