import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTaskTheme,
  listTaskThemes,
} from "../../redux/actions/taskThemeActions";
import {
  TASKTHEME_CREATE_RESET,
  TASKTHEME_DELETE_RESET,
  TASKTHEME_UPDATE_RESET,
} from "../../redux/constants/taskThemeConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";

import { ActionStatus } from "../../components/ActionStatus";

export default function TaskThemeScreen(props) {
  const taskThemeList = useSelector((state) => state.taskThemeList);
  const { loading, error, pages, taskThemes, pageNumber, pageSize } =
    taskThemeList;

  const taskThemeCreate = useSelector((state) => state.taskThemeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = taskThemeCreate;

  const taskThemeUpdate = useSelector((state) => state.taskThemeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskThemeUpdate;

  const taskThemeDelete = useSelector((state) => state.taskThemeDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = taskThemeDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: TASKTHEME_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: TASKTHEME_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(listTaskThemes({ name: "", pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: TASKTHEME_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listTaskThemes({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const updateHandler = (taskThemeId) => {
    props.history.push(`/tasktheme/${taskThemeId}/edit`);
  };

  const deleteHandler = (taskThemeId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteTaskTheme(taskThemeId));
    }
  };

  const taskThemesHeadCells = [
    // {
    //   field: "_id",
    //   headerName: "id",
    //   hide: true,
    //   type: "string",
    // },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "teams",
      headerName: "TEAMS",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="row">
          {params.value.map((team, index) => (
            <p key={index}>{index + 1 + " - " + team.name + " "}</p>
          ))}
        </div>
      ),
      type: "string",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Task Themes : </h1>
          <input
            type="search"
            id="taskTheme"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Task Theme Name "
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/tasktheme/${null}/edit`);
          }}
        >
          Add TaskTheme
        </button>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"User Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"User Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"User Deleted Successfuly"}
      />

      <AppDataGrid
        columns={taskThemesHeadCells}
        tableRows={taskThemes}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listTaskThemes({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listTaskThemes({
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
