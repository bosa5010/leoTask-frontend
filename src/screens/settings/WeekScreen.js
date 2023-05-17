import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteWeek, listWeeks } from "../../redux/actions/weekActions";
import {
  WEEK_CREATE_RESET,
  WEEK_DELETE_RESET,
  WEEK_UPDATE_RESET,
} from "../../redux/constants/weekConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";
import AppDateTimePicker from "../../components/appDateTimePicker/AppDateTimePicker";
import moment from "../../../node_modules/moment/moment";
import { ActionStatus } from "../../components/ActionStatus";

export default function WeekScreen(props) {
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState();

  const weekList = useSelector((state) => state.weekList);
  const { loading, error, pages, weeks, pageNumber, pageSize } = weekList;

  const weekCreate = useSelector((state) => state.weekCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = weekCreate;

  const weekUpdate = useSelector((state) => state.weekUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = weekUpdate;

  const weekDelete = useSelector((state) => state.weekDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = weekDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: WEEK_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: WEEK_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(
        listWeeks({
          name: "",
          pageNumber: 1,
          pageSize: 50,
          firstDate,
          lastDate,
        })
      );
    }
  }, [
    dispatch,
    successCreate,
    successUpdate,
    successDelete,

    firstDate,
    lastDate,
  ]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: WEEK_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const searchHandler = (e) => {
    dispatch(
      listWeeks({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
        firstDate,
        lastDate,
      })
    );
  };

  const deleteHandler = (weekId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteWeek(weekId));
    }
  };

  const updateHandler = (weekId) => {
    props.history.push(`/week/${weekId}/edit`);
  };

  const weeksHeadCells = [
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
      flex: 2,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "number",
      headerName: "Number",
      flex: 1,
      type: "number",
      headerClassName: "headeritem",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {moment(params.row.startDate).format("YYYY MMM DD")}
          </div>
        );
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      type: "string",
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {moment(params.row.endDate).format("YYYY MMM DD")}
          </div>
        );
      },
      headerClassName: "headeritem",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Weeks : </h1>
          <input
            type="search"
            id="week"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Week Name"
            autoComplete="off"
          />
          <div className="row">
            <AppDateTimePicker
              selectedDate={firstDate}
              setSelectedDate={setFirstDate}
              label={"Start Date : "}
            />
            <AppDateTimePicker
              selectedDate={lastDate}
              setSelectedDate={setLastDate}
              label={"End Date : "}
            />
          </div>
        </div>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/week/${null}/edit`);
          }}
        >
          Add Week
        </button>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/weeks/${null}/edit`);
          }}
        >
          Add Many Weeks
        </button>
      </div>

      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Week Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"Week Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Week Deleted Successfuly"}
      />

      <AppDataGrid
        columns={weeksHeadCells}
        tableRows={weeks}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listWeeks({
              pageNumber: data + 1,
              pageSize: pageSize,
              firstDate,
              lastDate,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listWeeks({
              pageNumber: data < pages ? pageNumber : 1,
              pageSize: data,
              firstDate,
              lastDate,
            })
          );
        }}
        onUpdatePress={updateHandler}
        onDeletePress={deleteHandler}
      />
    </div>
  );
}
