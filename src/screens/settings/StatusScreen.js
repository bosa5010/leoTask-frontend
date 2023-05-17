import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditModal from "./EditModal";
import {
  deleteStatus,
  updateStatus,
  createStatus,
  listStatuss,
} from "../../redux/actions/statusActions";
import {
  STATUS_CREATE_RESET,
  STATUS_DELETE_RESET,
  STATUS_UPDATE_RESET,
} from "../../redux/constants/statusConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { DeleteOutline } from "@material-ui/icons";
import { ActionStatus } from "../../components/ActionStatus";

export default function StatusScreen(props) {
  const [statusId, setStatusId] = useState("");

  const statusList = useSelector((state) => state.statusList);
  const { loading, error, pages, status, pageNumber, pageSize } = statusList;

  const statusCreate = useSelector((state) => state.statusCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = statusCreate;

  const statusUpdate = useSelector((state) => state.statusUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdated,
  } = statusUpdate;

  const statusDelete = useSelector((state) => state.statusDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = statusDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: STATUS_CREATE_RESET });
      }, 2000);
    }

    if (successUpdated) {
      setTimeout(function () {
        dispatch({ type: STATUS_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdated) {
      dispatch(listStatuss({ name: "", pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, successCreate, successUpdated, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: STATUS_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listStatuss({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const createHandler = (name, description, number) => {
    console.log("name, description, number", name, description, number);
    dispatch(
      createStatus({
        name: name,
        description: description,
        number: number,
      })
    );
  };

  const updateHandler = (name, desc, number) => {
    dispatch(
      updateStatus({
        _id: statusId,
        name: name,
        description: desc,
        number: number,
      })
    );
  };

  const deleteHandler = (statusId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteStatus(statusId));
    }
  };

  const statussHeadCells = [
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
      field: "number",
      headerName: "Number",
      flex: 1,
      headerClassName: "headeritem",
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
                setStatusId("");
                dispatch({ type: STATUS_UPDATE_RESET });
              }}
              onOpen={() => {
                setStatusId(params.row._id);
                dispatch({ type: STATUS_UPDATE_RESET });
              }}
              title={"Update Status"}
              className={"itemListEdit"}
              onSubmit={updateHandler}
              loading={loadingUpdate}
              success={successUpdated}
              error={errorUpdate}
              extraFieldName={"number"}
              typeField={"Number"}
              labeField={"Number"}
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
          <h1>Status : </h1>
          <input
            type="search"
            id="status"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder=" Status Name"
            autoComplete="off"
          />
        </div>
        <div>
          <EditModal
            onClose={() => {
              setStatusId("");
              dispatch({ type: STATUS_CREATE_RESET });
            }}
            title={"Add Status"}
            className={"priamry"}
            onSubmit={createHandler}
            loading={loadingCreate}
            success={successCreate}
            error={errorCreate}
            extraFieldName={"number"}
            typeField={"number"}
            labeField={"Number"}
          />
        </div>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Status Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdated}
        message={"Status Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Status Deleted Successfuly"}
      />

      <AppDataGrid
        columns={statussHeadCells}
        tableRows={status}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        popper={false}
        onPageChange={(data) => {
          dispatch(
            listStatuss({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listStatuss({
              pageNumber: data < pages ? pageNumber : 1,
              pageSize: data,
            })
          );
        }}
      />
    </div>
  );
}
