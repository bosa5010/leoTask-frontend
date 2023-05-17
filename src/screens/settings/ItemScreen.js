import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteItem, listItems } from "../../redux/actions/itemActions";
import {
  ITEM_CREATE_RESET,
  ITEM_DELETE_RESET,
  ITEM_UPDATE_RESET,
} from "../../redux/constants/itemConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { ActionStatus } from "../../components/ActionStatus";

export default function ItemScreen(props) {
  const itemList = useSelector((state) => state.itemList);
  const { loading, error, pages, items, pageNumber, pageSize } = itemList;

  const itemCreate = useSelector((state) => state.itemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = itemCreate;

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdated,
  } = itemUpdate;

  const itemDelete = useSelector((state) => state.itemDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = itemDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: ITEM_CREATE_RESET });
      }, 2000);
    }

    if (successUpdated) {
      setTimeout(function () {
        dispatch({ type: ITEM_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdated) {
      dispatch(listItems({ name: "", pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, successCreate, successUpdated, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: ITEM_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listItems({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const deleteHandler = (itemId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteItem(itemId));
    }
  };

  const updateHandler = (itemId) => {
    props.history.push(`/item/${itemId}/edit`);
  };

  const stringList = (values) => {
    var value = "";
    values?.map(
      (step, index) => (value = value + " " + (index + 1) + "-" + step.name)
    );
    return value;
  };

  const itemsHeadCells = [
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
      field: "itemStatus",
      headerName: "Item Status",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => stringList(params.value),
      type: "string",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Items : </h1>
          <input
            type="search"
            id="item"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Name Item"
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/item/${null}/edit`);
          }}
        >
          Add Item
        </button>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Item Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdated}
        message={"Item Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Item Deleted Successfuly"}
      />
      <AppDataGrid
        columns={itemsHeadCells}
        tableRows={items}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listItems({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listItems({
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
