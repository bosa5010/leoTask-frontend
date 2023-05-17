import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteStep, listSteps } from "../../redux/actions/stepActions";
import {
  STEP_CREATE_RESET,
  STEP_DELETE_RESET,
  STEP_UPDATE_RESET,
} from "../../redux/constants/stepConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import ReactSelect from "../../components/react-select/ReactSelect";
import { listTaskModels } from "../../redux/actions/taskModelActions";
import { ActionStatus } from "../../components/ActionStatus";

export default function StepScreen(props) {
  const stepList = useSelector((state) => state.stepList);
  const { loading, error, pages, steps, pageNumber, pageSize } = stepList;

  const stepCreate = useSelector((state) => state.stepCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = stepCreate;

  const stepUpdate = useSelector((state) => state.stepUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = stepUpdate;

  const stepDelete = useSelector((state) => state.stepDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = stepDelete;

  const taskModelList = useSelector((state) => state.taskModelList);
  const {
    loading: loadingTaskModel,
    error: errorTaskModel,
    taskModels,
  } = taskModelList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: STEP_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: STEP_UPDATE_RESET });
      }, 2000);
    }

    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(listSteps({ name: "", pageNumber: 1, pageSize: 15 }));
    }

    dispatch(
      listTaskModels({
        pageNumber: 1,
        pageSize: 3,
      })
    );
  }, [dispatch, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: STEP_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listSteps({
        name: e.target.value,
        pageNumber,
        pageSize,
      })
    );
  };

  const deleteHandler = (stepId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteStep(stepId));
    }
  };

  const updateHandler = (stepId) => {
    props.history.push(`/step/${stepId}/edit`);
  };

  const handleChangeTaskModel = (e) => {
    dispatch(listSteps({ taskModel: e._id, pageNumber: 1, pageSize: 15 }));
  };

  const handleInputChange = (e) => {
    e !== "" &&
      dispatch(
        listTaskModels({
          name: e,
          pageNumber: 1,
          pageSize: 15,
        })
      );
  };

  const stringList = (values) => {
    var value = "";
    values?.map(
      (step, index) => (value = value + " " + (index + 1) + "-" + step.name)
    );
    return value;
  };

  const stepsHeadCells = [
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
      field: "taskModel",
      headerName: "Task Model",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.taskModel?.name}</div>
      ),
      type: "string",
    },
    {
      field: "items",
      headerName: "Items",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => stringList(params.value),
      type: "string",
    },
    {
      field: "number",
      headerName: "Number",
      flex: 1,
      headerClassName: "headeritem",
      type: "string",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Steps : </h1>
          <input
            type="search"
            id="step"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder=" Step Name"
            autoComplete="off"
          />
          <div className="selectTaskModel row" style={{ marginLeft: 10 }}>
            <>
              <label htmlFor="taskModel" className="labelTaskModel">
                {"Task Model : "}
              </label>
              <ReactSelect
                closeMenuOnSelect={true}
                onChange={handleChangeTaskModel}
                onInputChange={handleInputChange}
                options={taskModels}
                isMulti={false}
                isSearchable
                name="Task Model :"
                loading={loadingTaskModel}
                error={errorTaskModel}
                placeholder={"Task Model"}
              />
            </>
          </div>
        </div>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/step/${null}/edit`);
          }}
        >
          Add Step
        </button>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Step Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"Step Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Step Deleted Successfuly"}
      />

      <AppDataGrid
        columns={stepsHeadCells}
        tableRows={steps}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listSteps({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listSteps({
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
