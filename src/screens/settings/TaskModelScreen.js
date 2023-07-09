import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTaskModel,
  listTaskModels,
} from "../../redux/actions/taskModelActions";
import {
  TASKMODEL_CREATE_RESET,
  TASKMODEL_DELETE_RESET,
  TASKMODEL_UPDATE_RESET,
} from "../../redux/constants/taskModelConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { listTaskThemes } from "../../redux/actions/taskThemeActions";
import { ActionStatus } from "../../components/ActionStatus";

export default function TaskModelScreen(props) {
  const taskModelList = useSelector((state) => state.taskModelList);
  const { loading, error, pages, taskModels, pageNumber, pageSize } =
    taskModelList;

  const taskModelCreate = useSelector((state) => state.taskModelCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = taskModelCreate;

  const taskModelUpdate = useSelector((state) => state.taskModelUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskModelUpdate;

  const taskModelDelete = useSelector((state) => state.taskModelDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = taskModelDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: TASKMODEL_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: TASKMODEL_UPDATE_RESET });
      }, 2000);
    }

    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(listTaskModels({ name: "", pageNumber: 1, pageSize: 15 }));
    }

    dispatch(
      listTaskThemes({
        pageNumber: 1,
        pageSize: 15,
      })
    );
  }, [dispatch, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: TASKMODEL_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listTaskModels({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const deleteHandler = (taskModelId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteTaskModel(taskModelId));
    }
  };

  const updateHandler = (taskmodelId) => {
    props.history.push(`/taskmodel/${taskmodelId}/edit`);
  };

  const stringList = (values) => {
    var value = "";
    values?.map(
      (step, index) => (value = value + " " + (index + 1) + "-" + step.name)
    );
    return value;
  };

  const taskModelsHeadCells = [
    // {
    //   field: "_id",
    //   headerName: "id",
    //   hide: true,
    //   type: "string",
    // },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "taskTheme",
      headerName: "TASK THEME",
      type: "string",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.taskTheme?.name}</div>
      ),
    },
    {
      field: "systems",
      headerName: "Systems",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => stringList(params.value),
      type: "string",
    },
    {
      field: "groups",
      headerName: "Groups",
      flex: 2,
      headerClassName: "headeritem",
      renderCell: (params) => stringList(params.value),
      type: "string",
    },
    {
      field: "steps",
      headerName: "Steps",
      flex: 2,
      headerClassName: "headeritem",
      renderCell: (params) => stringList(params.value),
      type: "string",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>TaskModels : </h1>
          <input
            type="search"
            id="taskModel"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Name TaskModel"
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/taskmodel/${null}/edit`);
          }}
        >
          Add Task Model
        </button>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Task Model Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"Task Model Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Task Model Deleted Successfuly"}
      />

      <AppDataGrid
        columns={taskModelsHeadCells}
        tableRows={taskModels}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listTaskModels({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listTaskModels({
              pageNumber: data < pages ? pageNumber : 1,
              pageSize: data,
            })
          );
        }}
        onUpdatePress={updateHandler}
        onDeletePress={deleteHandler}
      />
    </div>
  );
}
