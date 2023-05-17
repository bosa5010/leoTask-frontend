import React, { useEffect } from "react";
import "./task.css";

import { useDispatch, useSelector } from "react-redux";
import { listSystems } from "../../redux/actions/systemActions";
import { listUsers } from "../../redux/actions/userActions";
import { listInstances } from "../../redux/actions/instanceActions";
import { listTaskModels } from "../../redux/actions/taskModelActions";
import { listItems } from "../../redux/actions/itemActions";
import { listItemStatuss } from "../../redux/actions/itemStatusActions";
import moment from "../../../node_modules/moment/moment";
import GridContainer from "../../components/GridContainer";
import ReactSelect from "../../components/react-select/ReactSelect";
import ExportSubTaskToExcel from "../../components/excel/ExportSubTaskToExcel";
import { BsFilterCircle } from "react-icons/bs";
import AppDateTimePicker from "../../components/appDateTimePicker/AppDateTimePicker";
import { listTasks } from "../../redux/actions/taskActions";

export default function SubTaskFilter({
  filter,
  setFilter,
  listOfSystems,
  setListSystems,
  listTaskModel,
  setLisTaskModel,
  listInstance,
  setListInstance,
  listItem,
  setListItem,
  listOfTasks,
  setListOfTasks,
  listItemStatus,
  setListItemStatus,
  listUser,
  setListUsers,
  firstDate,
  setFirstDate,
  lastDate,
  setLastDate,
  dispatchSubTaskList,
  href = "/subtasklist",
}) {
  const subTaskList = useSelector((state) => state.subTaskList);
  const { subTasks } = subTaskList;

  const taskModelList = useSelector((state) => state.taskModelList);
  const {
    loading: loadingTaskModel,
    error: errorTaskModel,
    taskModels,
  } = taskModelList;

  const systemList = useSelector((state) => state.systemList);
  const { loading: loadingSystems, error: errorSystems, systems } = systemList;

  const itemList = useSelector((state) => state.itemList);
  const { loading: loadingItems, error: errorItems, items } = itemList;

  const itemStatusList = useSelector((state) => state.itemStatusList);
  const {
    loading: loadingItemStatus,
    error: errorItemStatus,
    itemStatuss,
  } = itemStatusList;

  const instanceList = useSelector((state) => state.instanceList);
  const {
    loading: loadingInstance,
    error: errorInstance,
    instances,
  } = instanceList;

  const taskList = useSelector((state) => state.taskList);
  const { loading: loadingTask, error: errorTask, tasks } = taskList;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSystems({}));

    dispatch(listUsers({}));

    dispatch(listInstances({}));

    dispatch(listTaskModels({}));

    dispatch(listItems({}));

    dispatch(listItemStatuss({}));

    dispatch(listTasks({}));
  }, [dispatch]);

  const handleInputChange = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 100,
        })
      );
  };

  const handleTaskInputChange = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          reference: e,
          pageNumber: 1,
          pageSize: 100,
        })
      );
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="row">
            <h1>SubTasks : </h1>
            <input
              type="search"
              id="task"
              onChange={(e) => {
                dispatchSubTaskList(1, 100, e.target.value, "itemComment");
              }}
              placeholder="Comment ..."
              autoComplete="off"
            />
          </div>
          <div className="row">
            <ExportSubTaskToExcel dataSet={subTasks}></ExportSubTaskToExcel>
          </div>
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
            {listOfTasks &&
              listOfTasks.length > 0 &&
              `"Tasks : ` +
                listOfTasks.map((item) => {
                  return " " + item.reference;
                }) +
                ` " `}
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

            {listOfSystems &&
              listOfSystems.length > 0 &&
              ` "Systems : ` +
                listOfSystems.map((item) => {
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
          <div className="filterItems">
            <ReactSelect
              setSelectedOptions={setListOfTasks}
              onInputChange={(e) => {
                handleTaskInputChange(e, listTasks);
              }}
              closeMenuOnSelect={true}
              options={tasks}
              defaultValue={listOfTasks}
              isMulti={true}
              isSearchable
              name="Tasks :"
              loading={loadingTask}
              error={errorTask}
              getOptionLabel={({ reference }) => reference}
              placeholder={"Tasks"}
              label={"Tasks :"}
            />
          </div>
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
          <div className="filterItems">
            <ReactSelect
              setSelectedOptions={setListUsers}
              onInputChange={(e) => {
                handleInputChange(e, listUsers);
              }}
              closeMenuOnSelect={true}
              options={users}
              defaultValue={listUser}
              isMulti={true}
              isSearchable
              name="Responsible Users :"
              loading={loadingUser}
              error={errorUser}
              placeholder={"Users"}
              label={"Responsible Users : "}
            />
          </div>
          <div className="filterItems">
            <ReactSelect
              closeMenuOnSelect={true}
              setSelectedOptions={setListSystems}
              onInputChange={(e) => {
                handleInputChange(e, listSystems);
              }}
              options={systems}
              defaultValue={listOfSystems}
              isMulti={true}
              isSearchable
              name="Systems :"
              loading={loadingSystems}
              error={errorSystems}
              placeholder={"Systems"}
              label={"Systems : "}
            />
          </div>

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
              placeholder={"Instances"}
              label={"Instances : "}
            />
          </div>
          <div className="filterItems">
            <ReactSelect
              setSelectedOptions={setListItem}
              onInputChange={(e) => {
                handleInputChange(e, listItems);
              }}
              closeMenuOnSelect={true}
              options={items}
              isMulti={true}
              defaultValue={listItem && listItem}
              isSearchable
              name="Items :"
              loading={loadingItems}
              error={errorItems}
              placeholder={"Items"}
              label={"Items : "}
            />
          </div>
          <div className="filterItems">
            <ReactSelect
              setSelectedOptions={setListItemStatus}
              onInputChange={(e) => {
                handleInputChange(e, listItemStatuss);
              }}
              closeMenuOnSelect={true}
              options={itemStatuss}
              isMulti={true}
              defaultValue={listItemStatus && listItemStatus}
              isSearchable
              name="ItemStatuss :"
              loading={loadingItemStatus}
              error={errorItemStatus}
              placeholder={"ItemStatus"}
              label={"ItemStatus : "}
            />
          </div>
          <div item xs={8}>
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
