import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./task.css";
import { listTasks } from "../../redux/actions/taskActions";

import AppDataGrid from "../../components/tables/AppDataGrid";
import moment from "../../../node_modules/moment/moment";
import { makeStyles } from "@material-ui/core/styles";
import TaskFilter from "./TaskFilter";
import { objectId } from "../../utils";

const useStyles = makeStyles({
  root: {
    "& .alertOn": {
      backgroundColor: "#fff",
      color: "#1a3e72",
    },
    "& .alertOrange": {
      backgroundColor: "#ffff00",
      color: "#1a3e72",
    },
    "& .alertRed": {
      backgroundColor: "#ff943975",
      color: "#1a3e72",
    },
  },
});

export default function TasksListScreen(props) {
  const taskModelId =
    props.match && props.match.params.taskmodelid !== "null"
      ? props.match.params.taskmodelid
      : null;

  const taskModelName =
    props.match && props.match.params.taskmodelname !== "null"
      ? props.match.params.taskmodelname
      : null;

  const userInfo =
    props.match && props.match.params.userid !== ""
      ? props.match.params.userid
      : null;

  const userName =
    props.match && props.match.params.username !== "null"
      ? props.match.params.username
      : null;

  const reference =
    props.match && props.match.params.reference !== "null"
      ? props.match.params.reference
      : null;

  const [filter, setFilter] = useState(false);
  const [listStatus, setListStatus] = useState();
  const [activeStatus, setActiveStatus] = useState();
  const [listTaskModel, setLisTaskModel] = useState();
  const [listGroup, setListGroups] = useState("");
  const [listInstance, setListInstance] = useState();
  const [listUser, setListUsers] = useState();
  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();

  const classes = useStyles();

  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks, pages, pageNumber, pageSize } = taskList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo: myUserInfo } = userSignin;

  const dispatch = useDispatch();

  const dispatchTaskList = useCallback(
    (pageNumber, pageSize, value, key) => {
      let tempObject = {
        pageNumber,
        pageSize,
        taskModels:
          listTaskModel?.length > 0 ? objectId(listTaskModel) : taskModelId,
        users: listUser && listUser.length > 0 ? objectId(listUser) : userInfo,
        status: objectId(listStatus),
        activeStatus: objectId(activeStatus),
        groups:
          listGroup?.length > 0
            ? objectId(listGroup)
            : objectId(myUserInfo?.groups),

        instance: objectId(listInstance),
        firstDate: firstDate,
        lastDate: lastDate,
        reference: reference,
      };

      tempObject[key] = value;

      dispatch(listTasks(tempObject));
    },
    [
      dispatch,
      listTaskModel,
      listGroup,
      listStatus,
      listUser,
      listInstance,
      firstDate,
      lastDate,
      taskModelId,
      userInfo,
      reference,
      myUserInfo,
      activeStatus,
    ]
  );

  useEffect(() => {
    dispatchTaskList(1, 15);
  }, [dispatchTaskList]);

  const tasksHeadCells = [
    // {
    //   field: "_id",
    //   headerName: "id",
    //   hide: true,
    //   type: "string",
    // },
    {
      field: "reference",
      headerName: "Reference",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div>
          <Link to={`/subtask/${params.row._id}/edit`}>
            <button
              className={
                moment(params.row.dedline).format("YYYY-MM-DD") <=
                moment(new Date()).format("YYYY-MM-DD")
                  ? "itemListAlert"
                  : moment(params.row.dedline).format("YYYY-MM-DD") <
                    moment(new Date()).add(3, "days").format("YYYY-MM-DD")
                  ? "itemListWarning"
                  : "itemListEdit"
              }
            >
              {params.row.reference}
            </button>
          </Link>
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
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
        taskModelName={taskModelName}
        userInfo={userInfo}
        userName={userName}
        dispatchTaskList={dispatchTaskList}
      />

      <div className={classes.root}>
        <AppDataGrid
          columns={tasksHeadCells}
          tableRows={tasks}
          page={pageNumber - 1}
          pageSize={Number(pageSize)}
          rowCount={Number(pages)}
          loading={loading}
          error={error}
          popper={false}
          onPageChange={(data) => {
            dispatchTaskList(data + 1, pageSize);
          }}
          onPageSizeChange={(data) => {
            dispatchTaskList(data < pages ? pageNumber : 1, data);
          }}
          // getRowClassName={(params) => {
          //   return moment(params.row.dedline).format("YYYY-MM-DD") <=
          //     moment(new Date()).format("YYYY-MM-DD")
          //     ? "alertRed"
          //     : moment(params.row.dedline).format("YYYY-MM-DD") <
          //         moment(new Date()).add(3, "days").format("YYYY-MM-DD") &&
          //         "alertOrange";
          // }}
        />
      </div>
    </div>
  );
}
