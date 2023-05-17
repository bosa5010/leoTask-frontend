import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../../redux/actions/userActions";
import {
  USER_DELETE_RESET,
  USER_UPDATE_RESET,
} from "../../redux/constants/userConstants";

import AppDataGrid from "../../components/tables/AppDataGrid";
import { ActionStatus } from "../../components/ActionStatus";

export default function UserListScreen(props) {
  const { onCellClick } = props;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, pages, pageNumber, pageSize } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers({ pageNumber: 1, pageSize: 15 }));
  }, [dispatch]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: USER_DELETE_RESET });
      }, 2000);
    }
    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: USER_UPDATE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete, successUpdate]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(userId));
    }
  };

  const updateHandler = (userId) => {
    props.history.push(`/user/${userId}/edit`);
  };

  const searchHandler = (e) => {
    dispatch(
      listUsers({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 10,
      })
    );
  };

  const createHandler = (params) => {
    props.history && props.history.push(`/user/${null}/edit`);
  };

  const usersHeadCells = [
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
      field: "email",
      headerName: "Email",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },

    {
      field: "isAdmin",
      headerName: "Admin",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => {
        return (
          <div className="rowitem">{params.row.isAdmin ? "YES" : "NO"}</div>
        );
      },
    },
    {
      field: "isSuperAdmin",
      headerName: "Super Admin",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isSuperAdmin ? "YES" : "NO"}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Users : </h1>
          <input
            type="search"
            id="user"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="User Name"
            autoComplete="off"
          />
        </div>
        <button type="button" className="addButton" onClick={createHandler}>
          Add User
        </button>
      </div>

      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"User Deleted Successfuly"}
      />

      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"User Updated Successfuly"}
      />

      <AppDataGrid
        columns={usersHeadCells}
        tableRows={users}
        page={Number(pageNumber - 1)}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onCellClick={(data) => {
          onCellClick && onCellClick(data.row);
        }}
        onPageChange={(data) => {
          dispatch(
            listUsers({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listUsers({
              pageNumber: pageNumber,
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
