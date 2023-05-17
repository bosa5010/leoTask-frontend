import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditModal from "./EditModal";
import {
  deleteTeam,
  updateTeam,
  createTeam,
  listTeams,
} from "../../redux/actions/teamActions";
import {
  TEAM_CREATE_RESET,
  TEAM_DELETE_RESET,
  TEAM_UPDATE_RESET,
} from "../../redux/constants/teamConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { DeleteOutline } from "@material-ui/icons";
import { ActionStatus } from "../../components/ActionStatus";

export default function TeamScreen(props) {
  const [teamId, setTeamId] = useState("");

  const teamList = useSelector((state) => state.teamList);
  const { loading, error, pages, teams, pageNumber, pageSize } = teamList;

  const teamCreate = useSelector((state) => state.teamCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = teamCreate;

  const teamUpdate = useSelector((state) => state.teamUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = teamUpdate;

  const teamDelete = useSelector((state) => state.teamDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = teamDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: TEAM_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: TEAM_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(listTeams({ name: "", pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: TEAM_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listTeams({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const createHandler = (name, description) => {
    dispatch(
      createTeam({
        name: name,
        description: description,
      })
    );
  };

  const updateHandler = (name, desc) => {
    dispatch(
      updateTeam({
        _id: teamId,
        name: name,
        description: desc,
      })
    );
  };

  const deleteHandler = (teamId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteTeam(teamId));
    }
  };

  const teamsHeadCells = [
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
                setTeamId("");
                dispatch({ type: TEAM_UPDATE_RESET });
              }}
              onOpen={() => {
                setTeamId(params.row._id);
                dispatch({ type: TEAM_UPDATE_RESET });
              }}
              title={"Update Team"}
              className={"itemListEdit"}
              onSubmit={updateHandler}
              loading={loadingUpdate}
              success={successUpdate}
              error={errorUpdate}
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
          <h1>Teams : </h1>
          <input
            type="search"
            id="team"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Name Team"
            autoComplete="off"
          />
        </div>
        <div>
          <EditModal
            onClose={() => {
              setTeamId("");
              dispatch({ type: TEAM_CREATE_RESET });
            }}
            title={"Add Team"}
            className={"priamry"}
            onSubmit={createHandler}
            loading={loadingCreate}
            success={successCreate}
            error={errorCreate}
          />
        </div>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Team Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"Team Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Team Deleted Successfuly"}
      />

      <AppDataGrid
        columns={teamsHeadCells}
        tableRows={teams}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        popper={false}
        onPageChange={(data) => {
          dispatch(
            listTeams({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listTeams({
              pageNumber: data < pages ? pageNumber : 1,
              pageSize: data,
            })
          );
        }}
      />
    </div>
  );
}
