import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./task.css";
import { listSubTasks } from "../../redux/actions/subTaskActions";
import AppDataGrid from "../../components/tables/AppDataGrid";
import moment from "../../../node_modules/moment/moment";
import SubTaskFilter from "./SubTaskFilter";

export default function SubTaskListScreen(props) {
  const [filter, setFilter] = useState(false);
  const [listOfSystems, setListSystems] = useState();
  const [listTaskModel, setLisTaskModel] = useState();
  const [listInstance, setListInstance] = useState();
  const [listOfTasks, setListOfTasks] = useState();
  const [listItem, setListItem] = useState();
  const [listItemStatus, setListItemStatus] = useState();
  const [listUser, setListUsers] = useState();
  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();

  const subTaskList = useSelector((state) => state.subTaskList);
  const { loading, error, subTasks, pages, pageNumber, pageSize } = subTaskList;

  const dispatch = useDispatch();

  const dispatchSubTaskList = useCallback(
    (pageNumber, pageSize, value, key) => {
      let tempObject = {
        pageNumber,
        pageSize,
        taskModels: objectId(listTaskModel),
        users: objectId(listUser),
        systems: objectId(listOfSystems),
        instance: objectId(listInstance),
        items: objectId(listItem),
        itemStatus: objectId(listItemStatus),
        tasks: objectId(listOfTasks),
        firstDate: firstDate,
        lastDate: lastDate,
        taskStep: "null",
      };

      tempObject[key] = value;

      dispatch(listSubTasks(tempObject));
    },
    [
      dispatch,
      listTaskModel,
      listOfSystems,
      listOfTasks,
      listUser,
      listInstance,
      listItem,
      listItemStatus,
      firstDate,
      lastDate,
    ]
  );

  useEffect(() => {
    dispatchSubTaskList(1, 15);
  }, [dispatchSubTaskList]);

  const objectId = (objects) => {
    if (objects) {
      const tempObjects = objects.map(({ _id }) => _id);
      return tempObjects;
    }
    return [];
  };

  const subTasksHeadCells = [
    // {
    //   field: "_id",
    //   headerName: "id",
    //   hide: true,
    //   type: "string",
    // },

    {
      field: "task",
      headerName: "Task",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div>
          <Link to={`/subtask/${params.row?.task?._id}/edit`}>
            <button className="itemListEdit">
              {params.row?.task?.reference}
            </button>
          </Link>
        </div>
      ),
    },
    {
      field: "item",
      headerName: "Item",
      type: "string",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.item?.name}</div>
      ),
    },
    {
      field: "itemStatus",
      headerName: "Item Status",
      type: "string",
      flex: 1,
      headerClassName: "headeritem",

      renderCell: (params) => (
        <div className="cellItems">{params.row?.itemStatus?.name}</div>
      ),
    },
    {
      field: "itemNumber",
      headerName: "Number",
      flex: 1,
      type: "number",
      headerClassName: "headeritem",
    },
    {
      field: "itemComment",
      headerName: "Comment",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },

    {
      field: "system",
      headerName: "System",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.system?.name}</div>
      ),
      type: "string",
    },
    {
      field: "instance",
      headerName: "Instance",
      type: "string",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.instance?.name}</div>
      ),
    },
    {
      field: "taskModel",
      headerName: "Task Model",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      valueFormatter: (params) => params.row?.taskModel?.name,
      renderCell: (params) => (
        <div className="cellItems">{params.row?.taskModel?.name}</div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div>
          <p>{moment(params.value).locale("fr").format("DD/MM/YY")}</p>
        </div>
      ),
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.createdBy?.name}</div>
      ),
    },
  ];

  return (
    <div>
      <SubTaskFilter
        filter={filter}
        setFilter={setFilter}
        listOfSystems={listOfSystems}
        setListSystems={setListSystems}
        listTaskModel={listTaskModel}
        setLisTaskModel={setLisTaskModel}
        listInstance={listInstance}
        listOfTasks={listOfTasks}
        setListOfTasks={setListOfTasks}
        setListInstance={setListInstance}
        listItem={listItem}
        setListItem={setListItem}
        listItemStatus={listItemStatus}
        setListItemStatus={setListItemStatus}
        listUser={listUser}
        setListUsers={setListUsers}
        firstDate={firstDate}
        setFirstDate={setFirstDate}
        lastDate={lastDate}
        setLastDate={setLastDate}
        dispatchSubTaskList={dispatchSubTaskList}
      />

      <AppDataGrid
        columns={subTasksHeadCells}
        tableRows={subTasks}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        popper={false}
        onPageChange={(data) => {
          dispatchSubTaskList(data + 1, pageSize);
        }}
        onPageSizeChange={(data) => {
          dispatchSubTaskList(data < pages ? pageNumber : 1, data);
        }}
      />
    </div>
  );
}
