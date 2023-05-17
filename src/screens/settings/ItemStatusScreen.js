import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditModal from "./EditModal";
import {
  deleteItemStatus,
  updateItemStatus,
  createItemStatus,
  listItemStatuss,
} from "../../redux/actions/itemStatusActions";
import {
  ITEMSTATUS_CREATE_RESET,
  ITEMSTATUS_DELETE_RESET,
  ITEMSTATUS_UPDATE_RESET,
} from "../../redux/constants/itemStatusConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { DeleteOutline } from "@material-ui/icons";
import { ActionStatus } from "../../components/ActionStatus";

export default function ItemStatusScreen(props) {
  const [itemStatusId, setItemStatusId] = useState("");

  const itemStatusList = useSelector((state) => state.itemStatusList);
  const { loading, error, pages, itemStatuss, pageNumber, pageSize } =
    itemStatusList;

  const itemStatusCreate = useSelector((state) => state.itemStatusCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = itemStatusCreate;

  const itemStatusUpdate = useSelector((state) => state.itemStatusUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdated,
  } = itemStatusUpdate;

  const itemStatusDelete = useSelector((state) => state.itemStatusDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = itemStatusDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: ITEMSTATUS_CREATE_RESET });
      }, 2000);
    }

    if (successUpdated) {
      setTimeout(function () {
        dispatch({ type: ITEMSTATUS_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdated) {
      dispatch(listItemStatuss({ name: "", pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, successCreate, successUpdated, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: ITEMSTATUS_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const createHandler = (name, description) => {
    dispatch(
      createItemStatus({
        name: name,
        description: description,
      })
    );
  };

  const updateHandler = (name, desc) => {
    dispatch(
      updateItemStatus({
        _id: itemStatusId,
        name: name,
        description: desc,
      })
    );
  };

  const deleteHandler = (itemStatusId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteItemStatus(itemStatusId));
    }
  };

  const searchHandler = (e) => {
    dispatch(
      listItemStatuss({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const itemStatussHeadCells = [
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
                setItemStatusId("");
                dispatch({ type: ITEMSTATUS_UPDATE_RESET });
              }}
              onOpen={() => {
                setItemStatusId(params.row._id);
                dispatch({ type: ITEMSTATUS_UPDATE_RESET });
              }}
              title={"Update Item Status"}
              className={"itemListEdit"}
              onSubmit={updateHandler}
              loading={loadingUpdate}
              success={successUpdated}
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
          <h1>Item Status : </h1>
          <input
            type="search"
            id="itemStatus"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Name Item Status"
            autoComplete="off"
          />
        </div>
        <div>
          <EditModal
            onClose={() => {
              setItemStatusId("");
              dispatch({ type: ITEMSTATUS_CREATE_RESET });
            }}
            title={"Add Item Status"}
            className={"addButton"}
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
        message={"Item Status Added Successfully"}
      />

      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdated}
        message={"Item Status Updated Successfully"}
      />

      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Item Status Deleted Successfully"}
      />

      <AppDataGrid
        columns={itemStatussHeadCells}
        tableRows={itemStatuss}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        popper={false}
        onPageChange={(data) => {
          dispatch(
            listItemStatuss({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listItemStatuss({
              pageNumber: data < pages ? pageNumber : 1,
              pageSize: data,
            })
          );
        }}
      />
    </div>
  );
}
