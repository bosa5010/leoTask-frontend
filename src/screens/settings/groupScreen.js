import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteGroup, listGroups } from "../../redux/actions/groupActions";
import {
  GROUP_CREATE_RESET,
  GROUP_DELETE_RESET,
  GROUP_UPDATE_RESET,
} from "../../redux/constants/groupConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";

import { ActionStatus } from "../../components/ActionStatus";

export default function GroupScreen(props) {
  const groupList = useSelector((state) => state.groupList);
  const { loading, error, pages, groups, pageNumber, pageSize } = groupList;

  const groupCreate = useSelector((state) => state.groupCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = groupCreate;

  const groupUpdate = useSelector((state) => state.groupUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = groupUpdate;

  const groupDelete = useSelector((state) => state.groupDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = groupDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: GROUP_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: GROUP_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(listGroups({ name: "", pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: GROUP_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listGroups({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const deleteHandler = (groupId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteGroup(groupId));
    }
  };

  const updateHandler = (instanceId) => {
    props.history.push(`/group/${instanceId}/edit`);
  };

  const groupsHeadCells = [
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
      field: "team",
      headerName: "TEAM",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.team?.name}</div>
      ),
      type: "string",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Groups : </h1>
          <input
            type="search"
            id="group"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Group Name "
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/group/${null}/edit`);
          }}
        >
          Add Group
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
        columns={groupsHeadCells}
        tableRows={groups}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listGroups({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listGroups({
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
