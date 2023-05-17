import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditModal from "./EditModal";
import {
  createSystem,
  deleteSystem,
  listSystems,
  updateSystem,
} from "../../redux/actions/systemActions";
import {
  SYSTEM_CREATE_RESET,
  SYSTEM_DELETE_RESET,
  SYSTEM_UPDATE_RESET,
} from "../../redux/constants/systemConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { DeleteOutline } from "@material-ui/icons";
import { ActionStatus } from "../../components/ActionStatus";

export default function SystemScreen(props) {
  const [systemId, setSystemId] = useState("");

  const systemList = useSelector((state) => state.systemList);
  const { loading, error, pages, systems, pageNumber, pageSize } = systemList;

  const systemCreate = useSelector((state) => state.systemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = systemCreate;

  const systemUpdate = useSelector((state) => state.systemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = systemUpdate;

  const systemDelete = useSelector((state) => state.systemDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = systemDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: SYSTEM_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: SYSTEM_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(listSystems({ name: "", pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: SYSTEM_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listSystems({
        name: e.target.value,
        pageNumber,
        pageSize,
      })
    );
  };

  const createHandler = (name, description) => {
    dispatch(
      createSystem({
        name: name,
        description: description,
      })
    );
  };

  const updateHandler = (name, description) => {
    dispatch(
      updateSystem({
        _id: systemId,
        name: name,
        description: description,
      })
    );
    setSystemId("");
  };

  const deleteHandler = (systemId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteSystem(systemId));
    }
  };

  const systemsHeadCells = [
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
                setSystemId("");
                dispatch({ type: SYSTEM_UPDATE_RESET });
              }}
              onOpen={() => {
                setSystemId(params.row._id);
                dispatch({ type: SYSTEM_UPDATE_RESET });
              }}
              title={"Update System"}
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
          <h1>Systems : </h1>
          <input
            type="search"
            id="system"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="system Name"
            autoComplete="off"
          />
        </div>
        <div>
          <EditModal
            onClose={() => {
              setSystemId("");
              dispatch({ type: SYSTEM_CREATE_RESET });
            }}
            title={"Add System"}
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
        columns={systemsHeadCells}
        tableRows={systems}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        popper={false}
        onPageChange={(data) => {
          dispatch(
            listSystems({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listSystems({
              pageNumber: data < pages ? pageNumber : 1,
              pageSize: data,
            })
          );
        }}
      />
    </div>
  );
}
