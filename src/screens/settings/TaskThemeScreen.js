import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditModal from "./EditModal";
import {
  deleteTaskTheme,
  updateTaskTheme,
  createTaskTheme,
  listTaskThemes,
} from "../../redux/actions/taskThemeActions";
import {
  TASKTHEME_CREATE_RESET,
  TASKTHEME_DELETE_RESET,
  TASKTHEME_UPDATE_RESET,
} from "../../redux/constants/taskThemeConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { DeleteOutline } from "@material-ui/icons";
import ReactSelect from "../../components/react-select/ReactSelect";
import { listTeams } from "../../redux/actions/teamActions";
import { ActionStatus } from "../../components/ActionStatus";

export default function TaskThemeScreen(props) {
  const [taskThemeId, setTaskThemeId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState();

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

  const teamList = useSelector((state) => state.teamList);
  const { loading: loadingTeam, error: errorTeam, teams } = teamList;

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

    if (teams && teams.length === 0) {
      dispatch(
        listTeams({
          pageNumber: 1,
          pageSize: 15,
        })
      );
    }
  }, [dispatch, successCreate, successUpdate, successDelete, teams]);

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

  const createHandler = (name, description) => {
    dispatch(
      createTaskTheme({
        name: name,
        description: description,
        teams: selectedOptions,
      })
    );
  };

  const updateHandler = (name, desc) => {
    dispatch(
      updateTaskTheme({
        _id: taskThemeId,
        name: name,
        description: desc,
        teams: selectedOptions,
      })
    );
  };

  const deleteHandler = (taskThemeId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteTaskTheme(taskThemeId));
    }
  };

  const handleInputChange = (e) => {
    e !== "" &&
      dispatch(
        listTeams({
          name: e,
          pageNumber: 1,
          pageSize: 15,
        })
      );
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
    {
      field: "action",
      headerName: "ACTIONS",
      type: "number",
      flex: 1,
      headerClassName: "headeritem",

      renderCell: (params) => {
        return (
          <>
            <EditModal
              onClose={() => {
                setTaskThemeId("");
                dispatch({ type: TASKTHEME_UPDATE_RESET });
              }}
              onOpen={() => {
                setTaskThemeId(params.row._id);
                dispatch({ type: TASKTHEME_UPDATE_RESET });
              }}
              title={"Update Task Theme"}
              className={"itemListEdit"}
              onSubmit={updateHandler}
              loading={loadingUpdate}
              success={successUpdate}
              error={errorUpdate}
              myProp={
                <div>
                  <ReactSelect
                    closeMenuOnSelect={true}
                    defaultValue={params.row.teams}
                    setSelectedOptions={setSelectedOptions}
                    onInputChange={handleInputChange}
                    options={teams}
                    isMulti={true}
                    isSearchable
                    name="Teams"
                    loading={loadingTeam}
                    error={errorTeam}
                    label={"Teams"}
                  />
                </div>
              }
              item={params.row}
              component={"Update"}
            />
            <DeleteOutline
              className="itemListDelete"
              onClick={() => deleteHandler(params.row._id)}
              style={{ fontSize: 30 }}
            />
          </>
        );
      },
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
        <div>
          <EditModal
            onClose={() => {
              setTaskThemeId("");
              dispatch({ type: TASKTHEME_CREATE_RESET });
            }}
            title={"Add Task Theme"}
            className={"priamry"}
            onSubmit={createHandler}
            loading={loadingCreate}
            success={successCreate}
            error={errorCreate}
            myProp={
              <div>
                <ReactSelect
                  closeMenuOnSelect={true}
                  setSelectedOptions={setSelectedOptions}
                  onInputChange={handleInputChange}
                  options={teams}
                  isMulti={true}
                  isSearchable
                  name="Teams"
                  loading={loadingTeam}
                  error={errorTeam}
                  label={"Teams"}
                />
              </div>
            }
          />
        </div>
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
        popper={false}
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
      />
    </div>
  );
}
