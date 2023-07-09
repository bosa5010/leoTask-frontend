import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./task.css";
import { deleteTask, listTasks } from "../../redux/actions/taskActions";

import {
  TASK_DELETE_RESET,
  TASK_UPDATE_RESET,
} from "../../redux/constants/taskConstants";

import AppDataGrid from "../../components/tables/AppDataGrid";
import moment from "../../../node_modules/moment/moment";
import AppDialog from "../../components/appDialog/AppDialog";
import { ActionStatus } from "../../components/ActionStatus";
import TaskFilter from "./TaskFilter";
import { objectId } from "../../utils";

export default function TaskListScreen(props) {
  const [cellDescription, setCellDescription] = useState("");
  const [filter, setFilter] = useState(false);
  const [listStatus, setListStatus] = useState();
  const [activeStatus, setActiveStatus] = useState();
  const [listTaskModel, setLisTaskModel] = useState();
  const [listInstance, setListInstance] = useState();
  const [listUser, setListUsers] = useState();
  const [listGroup, setListGroups] = useState();
  const [firstDate, setFirstDate] = useState(
    new moment(new Date()).subtract(12, "months").toDate()
  );
  const [lastDate, setLastDate] = useState(moment().add(12, "months").toDate());

  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks, pages, pageNumber, pageSize } = taskList;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

  const taskUpdate = useSelector((state) => state.taskUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskUpdate;

  const dispatch = useDispatch();
  const dispatchTaskList = useCallback(
    (pageNumber, pageSize, value, key) => {
      let tempObject = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        taskModels: objectId(listTaskModel),
        users: objectId(listUser),
        groups: objectId(listGroup),
        status: objectId(listStatus),
        activeStatus: objectId(activeStatus),
        instance: objectId(listInstance),
        firstDate: firstDate,
        lastDate: lastDate,
      };

      tempObject[key] = value;

      dispatch(listTasks(tempObject));
    },
    [
      dispatch,
      listTaskModel,
      listStatus,
      activeStatus,
      listUser,
      listGroup,
      listInstance,
      firstDate,
      lastDate,
    ]
  );

  useEffect(() => {
    dispatchTaskList(1, 15);
  }, [dispatchTaskList, successDelete, successUpdate]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: TASK_DELETE_RESET });
      }, 2000);
    }
    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: TASK_UPDATE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete, successUpdate]);

  const deleteHandler = (taskId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const updateHandler = (taskId) => {
    props.history.push(`/task/${taskId}/edit`);
  };

  const createHandler = () => {
    props.history && props.history.push(`/task/${null}/edit`);
  };

  const tasksHeadCells = [
    {
      field: "reference",
      headerName: "Reference",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div>
          <Link to={`/subtask/${params.row._id}/edit`}>
            <button className="itemListEdit">{params.row.reference}</button>
          </Link>
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      type: "string",
      headerClassName: "headeritem",
    },

    {
      field: "taskModel",
      headerName: "Task Model",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.taskModel?.name}</div>
      ),
    },

    {
      field: "instance",
      headerName: "Instance",
      flex: 0.7,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.instance?.name}</div>
      ),
      type: "string",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.7,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="row">
          <p>{moment(params.value).locale("fr").format("DD/MM/YY")}</p>
        </div>
      ),
    },

    {
      field: "dedline",
      headerName: "Dedline",
      flex: 0.7,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="row">
          <p>{moment(params.value).locale("fr").format("DD/MM/YY")}</p>
        </div>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.status?.name}</div>
      ),
    },
    {
      field: "responsibleGroup",
      headerName: "Responsible Group",
      flex: 1.3,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.responsibleGroup?.name}</div>
      ),
    },
    {
      field: "responsibleUser",
      headerName: "Responsible User",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.responsibleUser?.name}</div>
      ),
    },
  ];

  return (
    <div>
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        listStatus={listStatus}
        setListStatus={setListStatus}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        listTaskModel={listTaskModel}
        setLisTaskModel={setLisTaskModel}
        listInstance={listInstance}
        setListInstance={setListInstance}
        listUser={listUser}
        setListUsers={setListUsers}
        listGroup={listGroup}
        setListGroups={setListGroups}
        firstDate={firstDate}
        setFirstDate={setFirstDate}
        lastDate={lastDate}
        setLastDate={setLastDate}
        dispatchTaskList={dispatchTaskList}
        href="/tasklist"
        createHandler={createHandler}
      />

      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Task Deleted Successfully"}
      />

      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"Task Updated Successfully"}
      />

      <AppDataGrid
        columns={tasksHeadCells}
        tableRows={tasks}
        page={Number(pageNumber - 1)}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatchTaskList(data + 1, pageSize);
        }}
        onPageSizeChange={(data) => {
          // dispatchTaskList(data?.page < pages ? data?.page : 1, data?.pageSize);
          dispatchTaskList(pageNumber, data);
        }}
        onUpdatePress={updateHandler}
        onDeletePress={deleteHandler}
      />

      <AppDialog
        message={cellDescription.description}
        title={cellDescription.reference}
        onClose={() => {
          setCellDescription(null);
        }}
        open={cellDescription}
        setOpen={setCellDescription}
      />
    </div>
  );
}
