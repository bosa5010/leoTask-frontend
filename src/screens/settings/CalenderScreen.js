import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCalender,
  listCalenders,
} from "../../redux/actions/calenderActions";
import {
  CALENDER_CREATE_RESET,
  CALENDER_DELETE_RESET,
  CALENDER_UPDATE_RESET,
} from "../../redux/constants/calenderConstants";
import AppDataGrid from "../../components/tables/AppDataGrid";

import { listWeeks } from "../../redux/actions/weekActions";
import { listUsers } from "../../redux/actions/userActions";
import { ActionStatus } from "../../components/ActionStatus";
import ReactSelect from "../../components/react-select/ReactSelect";
import GridContainer from "../../components/GridContainer";
import { Grid } from "../../../node_modules/@material-ui/core/index";
import { BsFilterCircle } from "react-icons/bs";
import { objectId } from "../../utils";

export default function CalenderScreen(props) {
  const [listOfWeeks, setListWeeks] = useState();
  const [listOfUsers, setListUsers] = useState();
  const [filter, setFilter] = useState(false);

  const calenderList = useSelector((state) => state.calenderList);
  const { loading, error, pages, calenders, pageNumber, pageSize } =
    calenderList;

  const calenderCreate = useSelector((state) => state.calenderCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = calenderCreate;

  const calenderUpdate = useSelector((state) => state.calenderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdated,
  } = calenderUpdate;

  const calenderDelete = useSelector((state) => state.calenderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = calenderDelete;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const weekList = useSelector((state) => state.weekList);
  const { loading: loadingWeek, error: errorWeek, weeks } = weekList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: CALENDER_CREATE_RESET });
      }, 2000);
    }

    if (successUpdated) {
      setTimeout(function () {
        dispatch({ type: CALENDER_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdated) {
      dispatch(listCalenders({ name: "", pageNumber: 1, pageSize: 15 }));
    }

    if (users && users.length === 0) {
      dispatch(
        listUsers({
          pageNumber: 1,
          pageSize: 15,
        })
      );
    }
    if (weeks && weeks.length === 0) {
      dispatch(
        listWeeks({
          pageNumber: 1,
          pageSize: 15,
        })
      );
    }
  }, [dispatch, successCreate, successUpdated, successDelete, users, weeks]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: CALENDER_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  useEffect(() => {
    dispatch(
      listCalenders({
        name: "",
        users: objectId(listOfUsers),
        weeks: objectId(listOfWeeks),
      })
    );
  }, [dispatch, listOfUsers, listOfWeeks]);

  const searchHandler = (e) => {
    dispatch(
      listCalenders({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const deleteHandler = (calenderId) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteCalender(calenderId));
    }
  };

  const updateHandler = (calenderId) => {
    props.history.push(`/calender/${calenderId}/edit`);
  };

  const calendersHeadCells = [
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
      field: "user",
      headerName: "User",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.user?.name}</div>
      ),
    },
    {
      field: "week",
      headerName: "Week",
      flex: 1,
      type: "string",
      headerClassName: "headeritem ",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.week?.description}</div>
      ),
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Calenders : </h1>
          <input
            type="search"
            id="calender"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Calender Name "
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          className="adlButton row"
          onClick={() => {
            props.history && props.history.push(`/calender/${null}/edit`);
          }}
        >
          Add Calender
        </button>
      </div>
      <button
        type="button"
        className="adlButton row"
        style={{ marginRight: "1rem" }}
        onClick={() => {
          setFilter(!filter);
        }}
      >
        <BsFilterCircle style={{ fontSize: "2.5rem" }} />
      </button>
      {filter && (
        <GridContainer title={"Filter"}>
          <Grid item xs={10}>
            <div>
              <ReactSelect
                closeMenuOnSelect={true}
                setSelectedOptions={setListWeeks}
                options={weeks}
                defaultValue={listOfWeeks && listOfWeeks}
                isMulti={true}
                isSearchable
                name="Week :"
                loading={loadingWeek}
                error={errorWeek}
                placeholder={"Week"}
                label={"Week : "}
              />
            </div>
          </Grid>
          <Grid item xs={10}>
            <div>
              <ReactSelect
                setSelectedOptions={setListUsers}
                closeMenuOnSelect={true}
                options={users}
                defaultValue={listOfUsers && listOfUsers}
                isMulti={true}
                isSearchable
                name="Responsible User :"
                loading={loadingUser}
                error={errorUser}
                placeholder={"Users"}
                label="Responsible User :"
              />
            </div>
          </Grid>
        </GridContainer>
      )}
      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Calender Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdated}
        message={"Calender Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Calender Deleted Successfuly"}
      />
      <AppDataGrid
        columns={calendersHeadCells}
        tableRows={calenders}
        page={pageNumber - 1}
        pageSize={Number(pageSize)}
        rowCount={Number(pages)}
        loading={loading}
        error={error}
        onPageChange={(data) => {
          dispatch(
            listCalenders({
              pageNumber: data + 1,
              pageSize: pageSize,
            })
          );
        }}
        onPageSizeChange={(data) => {
          dispatch(
            listCalenders({
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
