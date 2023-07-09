import React, { useEffect, useState } from "react";
import "./task.css";

import { useDispatch, useSelector } from "react-redux";
import { listSystems } from "../../redux/actions/systemActions";
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
import {
  objectId,
  taskModelItemStatus,
  taskModelItems,
  taskModelSystems,
} from "../../utils";

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
  const [selectedSystems, setSelectedSystems] = useState();
  const [selectedItems, setSelectedItems] = useState();
  const [selectedItemsStatus, setSelectedItemsStatus] = useState();
  const subTaskList = useSelector((state) => state.subTaskList);
  const { subTasks } = subTaskList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const taskModelList = useSelector((state) => state.taskModelList);
  const {
    loading: loadingTaskModel,
    error: errorTaskModel,
    taskModels,
  } = taskModelList;

  const instanceList = useSelector((state) => state.instanceList);
  const {
    loading: loadingInstance,
    error: errorInstance,
    instances,
  } = instanceList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTaskModels({ groups: objectId(userInfo?.groups) }));
  }, [dispatch, userInfo]);

  useEffect(() => {
    setLisTaskModel(taskModels && taskModels[0]);
  }, [dispatch, taskModels, setLisTaskModel]);

  useEffect(() => {
    if (listTaskModel) {
      setSelectedSystems(taskModelSystems(listTaskModel));
      setSelectedItems(taskModelItems(listTaskModel));
    }
  }, [setSelectedSystems, setSelectedItems, listTaskModel]);

  useEffect(() => {
    dispatch(listInstances({ systems: objectId(listOfSystems) }));
  }, [dispatch, listOfSystems]);

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

  const handleInputChangeTaskModel = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 100,
          groups: objectId(userInfo.groups),
        })
      );
  };
  const handleInputChangeInstance = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 100,
          systems: objectId(listOfSystems),
        })
      );
  };

  const onChangeTaskModel = (value) => {
    if (value) {
      setSelectedSystems(taskModelSystems(value));
      setSelectedItems(taskModelItems(value));
      setListSystems("");
      setListInstance("");
      setListItem("");
      setListItemStatus("");
    }
  };

  const onChangeItem = (items) => {
    if (items?.length > 0) {
      setSelectedItemsStatus(taskModelItemStatus(items));
    } else {
      setListItemStatus("");
    }
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
            {listTaskModel &&
              ` "Task Models : ` +
                [listTaskModel].map((item) => {
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

            {listInstance &&
              listInstance.length > 0 &&
              `"Instances : ` +
                listInstance.map((item) => {
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
              setSelectedOptions={setLisTaskModel}
              onInputChange={(e) => {
                handleInputChangeTaskModel(e, listTaskModels);
              }}
              onChange={onChangeTaskModel}
              closeMenuOnSelect={true}
              options={taskModels}
              defaultValue={listTaskModel}
              isMulti={false}
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
              closeMenuOnSelect={true}
              setSelectedOptions={setListSystems}
              onInputChange={(e) => {
                handleInputChange(e, listSystems);
              }}
              options={selectedSystems}
              isDisabled={listTaskModel?.length === 0}
              defaultValue={listOfSystems}
              value={listOfSystems}
              isMulti={true}
              isSearchable
              name="Systems :"
              loading={loadingTaskModel}
              error={errorTaskModel}
              placeholder={"Systems"}
              label={"Systems : "}
            />
          </div>

          <div className="filterItems">
            <ReactSelect
              setSelectedOptions={setListInstance}
              onInputChange={(e) => {
                handleInputChangeInstance(e, listInstances);
              }}
              closeMenuOnSelect={true}
              options={instances}
              isMulti={true}
              defaultValue={listInstance && listInstance}
              value={listInstance && listInstance}
              isSearchable
              isDisabled={listOfSystems?.length === 0}
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
              onChange={onChangeItem}
              options={selectedItems}
              isDisabled={listTaskModel?.length === 0}
              isMulti={true}
              defaultValue={listItem && listItem}
              value={listItem && listItem}
              isSearchable
              name="Items :"
              loading={loadingTaskModel}
              error={errorTaskModel}
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
              options={selectedItemsStatus}
              isDisabled={listItem?.length === 0}
              isMulti={true}
              defaultValue={listItemStatus}
              value={listItemStatus}
              isSearchable
              name="ItemStatuss :"
              loading={loadingTaskModel}
              error={errorTaskModel}
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
