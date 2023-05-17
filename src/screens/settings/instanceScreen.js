import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteInstance,
  listInstances,
} from "../../redux/actions/instanceActions";
import {
  INSTANCE_CREATE_RESET,
  INSTANCE_DELETE_RESET,
  INSTANCE_UPDATE_RESET,
} from "../../redux/constants/instanceConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { listSystems } from "../../redux/actions/systemActions";
import { ActionStatus } from "../../components/ActionStatus";
import ReactSelect from "../../components/react-select/ReactSelect";

export default function InstanceScreen(props) {
  const instanceList = useSelector((state) => state.instanceList);
  const { loading, error, pages, instances, pageNumber, pageSize } =
    instanceList;

  const instanceCreate = useSelector((state) => state.instanceCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = instanceCreate;

  const instanceUpdate = useSelector((state) => state.instanceUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdated,
  } = instanceUpdate;

  const instanceDelete = useSelector((state) => state.instanceDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = instanceDelete;

  const systemList = useSelector((state) => state.systemList);
  const { loading: loadingSystem, error: errorSystem, systems } = systemList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: INSTANCE_CREATE_RESET });
      }, 2000);
    }

    if (successUpdated) {
      setTimeout(function () {
        dispatch({ type: INSTANCE_UPDATE_RESET });
      }, 2000);
    }
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: INSTANCE_DELETE_RESET });
      }, 2000);
    }

    dispatch(listInstances({ name: "", pageNumber: 1, pageSize: 15 }));

    dispatch(listSystems({}));
  }, [dispatch, successCreate, successUpdated, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listInstances({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const deleteHandler = (instanceId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteInstance(instanceId));
    }
  };

  const updateHandler = (instanceId) => {
    props.history.push(`/instance/${instanceId}/edit`);
  };

  const handleInputChange = (e) => {
    e !== "" &&
      dispatch(
        listSystems({
          name: e,
          pageNumber: 1,
          pageSize: 15,
        })
      );
  };

  const instancesHeadCells = [
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
      field: "system",
      headerName: "System",
      // type: "string",
      maxWidth: 120,
      flex: 0.3,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.system?.name}</div>
      ),
    },
  ];

  const handleChangeTaskModel = (e) => {
    dispatch(listInstances({ system: e._id, pageNumber: 1, pageSize: 15 }));
  };
  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Instances : </h1>
          <input
            type="search"
            id="instance"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder=" Instance Name"
            autoComplete="off"
          />
          <div className="selectTaskModel row" style={{ marginLeft: 10 }}>
            <>
              <label htmlFor="System" className="labelTaskModel">
                {"System : "}
              </label>
              <ReactSelect
                closeMenuOnSelect={true}
                onChange={handleChangeTaskModel}
                onInputChange={handleInputChange}
                options={systems}
                isMulti={false}
                isSearchable
                name="system :"
                loading={loadingSystem}
                error={errorSystem}
                placeholder={"System"}
              />
            </>
          </div>
        </div>

        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/instance/${null}/edit`);
          }}
        >
          Add Instance
        </button>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Instance Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdated}
        message={"Instance Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Instance Deleted Successfuly"}
      />

      <AppDataGrid
        columns={instancesHeadCells}
        tableRows={instances}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listInstances({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listInstances({
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
