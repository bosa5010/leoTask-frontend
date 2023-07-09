import React, { useEffect, useState } from "react";
import "./task.css";
import "./task.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { listTaskModels } from "../../redux/actions/taskModelActions";

import { listInstances } from "../../redux/actions/instanceActions";
import { listWeeks } from "../../redux/actions/weekActions";
import { createTasks, deleteTask } from "../../redux/actions/taskActions";
import {
  TASKS_CREATE_RESET,
  TASK_DELETE_RESET,
} from "../../redux/constants/taskConstants";
import GridContainer from "../../components/GridContainer";
import AppDialog from "../../components/FormsUI/dialog/FormDialog";
import FormButton from "../../components/FormsUI/button/FormButton";
import moment from "../../../node_modules/moment/moment";
import {
  Container,
  Grid,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import ReactSelectForm from "../../components/FormsUI/ReactSelect/ReactSelectForm";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";
import { listUsers } from "../../redux/actions/userActions";
import { listStatuss } from "../../redux/actions/statusActions";
import { ActionStatus } from "../../components/ActionStatus";
import LinkFormButton from "../../components/FormsUI/button/LinkFormButton";
import AppCheckboxForm from "../../components/FormsUI/AppCheckboxFrom/AppCheckboxForm";
import { Link } from "react-router-dom";
import AppDataGrid from "../../components/tables/AppDataGrid";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8),
  },
  formField: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    color: "blue",
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontSize: 15,
    color: "blue",
    fontWeight: 600,
  },
  grid: {
    border: 1,
    borderRadius: 3,
    boxShadow: `0 1px 5px 1px var(--color-border)`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const FORM_VALIDATION = Yup.object().shape({
  description: Yup.string().required("Please Enter Description"),
  shortDescription: Yup.string().required("Please Enter Short Description"),
  // reference: Yup.string().required("Please Enter reference"),
  taskModel: Yup.object().required("Please Choose Task Model"),
  currentStep: Yup.object().required("Please Choose Current Step"),
  status: Yup.object().required("Please Choose Status"),
  system: Yup.object().required("Please Choose System"),
  instance: Yup.array().required("Please Choose Instances"),
  startWeek: Yup.array().required("Please Select Start Weeks"),
  duration: Yup.object().required("Please Select Duration "),
  startFrom: Yup.object().required("Please Select Starting Day"),
  addMany: Yup.boolean(),
  responsibleGroup: Yup.object().required("Please Choose Responsible Group"),
  responsibleGroups: Yup.array().required("Please Choose Responsible Groups"),
  responsibleTeam: Yup.object().required("Please Choose Responsible Team"),
  responsibleTeams: Yup.array().required("Please Choose Responsible Teams"),
});

function lastweek() {
  var lastweek = moment(new Date()).startOf("week").format("YYYY-MM-DD");

  return lastweek;
}

const durations = [
  {
    _id: 1,
    name: "1 Day",
    numberDays: 1,
    nextWeek: 0,
  },
  {
    _id: 2,
    name: "2 Days",
    numberDays: 2,
    nextWeek: 0,
  },
  {
    _id: 3,
    name: "3 Days",
    numberDays: 3,
    nextWeek: 0,
  },
  {
    _id: 4,
    name: "4 Days",
    numberDays: 4,
    nextWeek: 0,
  },
  {
    _id: 5,
    name: "5 Days",
    numberDays: 5,
    nextWeek: 0,
  },
  {
    _id: 6,
    name: "6 Days",
    numberDays: 6,
    nextWeek: 0,
  },
  {
    _id: 7,
    name: "7 Days",
    numberDays: 7,
    nextWeek: 1,
  },
  {
    _id: 8,
    name: "8 Days",
    numberDays: 8,
    nextWeek: 1,
  },
  {
    _id: 9,
    name: "9 Days",
    numberDays: 9,
    nextWeek: 1,
  },
  {
    _id: 10,
    name: "10 Days",
    numberDays: 10,
    nextWeek: 1,
  },
  {
    _id: 11,
    name: "11 Days",
    numberDays: 11,
    nextWeek: 1,
  },
  {
    _id: 12,
    name: "12 Days",
    numberDays: 12,
    nextWeek: 1,
  },
  {
    _id: 13,
    name: "13 Days",
    numberDays: 13,
    nextWeek: 1,
  },
  {
    _id: 14,
    name: "14 Days",
    numberDays: 14,
    nextWeek: 2,
  },
  {
    _id: 15,
    name: "15 Days",
    numberDays: 15,
    nextWeek: 2,
  },
  {
    _id: 16,
    name: "16 Days",
    numberDays: 16,
    nextWeek: 2,
  },
  {
    _id: 17,
    name: "17 Days",
    numberDays: 17,
    nextWeek: 2,
  },
  {
    _id: 18,
    name: "18 Days",
    numberDays: 18,
    nextWeek: 2,
  },
  {
    _id: 19,
    name: "19 Days",
    numberDays: 19,
    nextWeek: 2,
  },
  {
    _id: 20,
    name: "20 Days",
    numberDays: 20,
    nextWeek: 2,
  },
  {
    _id: 21,
    name: "21 Days",
    numberDays: 21,
    nextWeek: 3,
  },
  {
    _id: 22,
    name: "22 Days",
    numberDays: 22,
    nextWeek: 3,
  },
  {
    _id: 23,
    name: "23 Days",
    numberDays: 23,
    nextWeek: 3,
  },
  {
    _id: 24,
    name: "24 Days",
    numberDays: 24,
    nextWeek: 3,
  },
  {
    _id: 25,
    name: "25 Days",
    numberDays: 25,
    nextWeek: 3,
  },
  {
    _id: 26,
    name: "26 Days",
    numberDays: 26,
    nextWeek: 3,
  },
  {
    _id: 27,
    name: "27 Days",
    numberDays: 27,
    nextWeek: 3,
  },
  {
    _id: 28,
    name: "28 Days",
    numberDays: 28,
    nextWeek: 4,
  },
  {
    _id: 29,
    name: "29 Days",
    numberDays: 29,
    nextWeek: 4,
  },
  {
    _id: 30,
    name: "30 Days",
    numberDays: 30,
    nextWeek: 4,
  },
  {
    _id: 31,
    name: "31 Days",
    numberDays: 31,
    nextWeek: 4,
  },
];

const startFrom = [
  { _id: 1, name: "Sunday", dayNumber: 0 },
  { _id: 2, name: "Monday", dayNumber: 1 },
  { _id: 3, name: "Tuesday", dayNumber: 2 },
  { _id: 4, name: "Wednesday", dayNumber: 3 },
  { _id: 5, name: "Thursday", dayNumber: 4 },
  { _id: 6, name: "Friday", dayNumber: 5 },
  { _id: 7, name: "Saturday", dayNumber: 6 },
];

export default function TasksEditScreen(props) {
  const [initialValues] = useState({
    description: "",
    shortDescription: "",
    reference: "",
    referenceNumber: 1,
    taskModel: "",
    currentStep: "",
    system: "",
    instance: "",
    startWeek: "",
    endWeek: "",
    startDate: "",
    endDate: "",
    closedDate: "",
    dedline: "",
    createdBy: "",
    status: "",
    duration: "",
    responsibleUser: "",
    responsibleUsers: "",
    responsibleGroup: "",
    responsibleGroups: "",
    responsibleTeam: "",
    responsibleTeams: "",
    startFrom: "",
    addMany: true,
  });

  const [fretchWeek, setFetchWeek] = useState(true);

  const [open, setOpen] = React.useState(false);

  const [lastWeek] = useState(lastweek());
  const [selectedSystem, setSelectedSystems] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedTaskModel, setSelectedTaskModel] = useState("");
  const [newTasks, setNewTasks] = useState();

  const classes = useStyles();

  const taskModelList = useSelector((state) => state.taskModelList);
  const {
    loading: loadingTaskModel,
    error: errorTaskModel,
    taskModels,
  } = taskModelList;

  const instanceList = useSelector((state) => state.instanceList);
  const {
    loading: loadingInstance,
    error: errorInstance,
    instances,
  } = instanceList;

  const weekList = useSelector((state) => state.weekList);
  const { loading: loadingWeek, error: errorWeek, weeks } = weekList;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const statusList = useSelector((state) => state.statusList);
  const { loading: loadingStatus, error: errorStatus, status } = statusList;

  const tasksCreate = useSelector((state) => state.tasksCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    task: createdTasks,
  } = tasksCreate;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listTaskModels({ name: "", pageNumber: 1, pageSize: 15 }));

    dispatch(
      listInstances({ name: "", pageNumber: 1, pageSize: 15, system: "" })
    );

    dispatch(
      listWeeks({
        firstDate: lastWeek,
        pageNumber: 1,
        pageSize: 53,
      })
    );

    dispatch(listStatuss({ name: "", pageNumber: 1, pageSize: 15 }));
  }, [dispatch, lastWeek]);

  useEffect(() => {
    dispatch(
      listUsers({
        name: "",
        pageNumber: 1,
        pageSize: 15,
        groups: selectedGroup._id,
      })
    );
  }, [dispatch, selectedGroup]);

  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        createdTasks && setNewTasks(createdTasks);

        dispatch({ type: TASKS_CREATE_RESET });
      }, 2000);
    }
  }, [dispatch, successCreate, createdTasks]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: TASK_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  const submitHandler = (values, { resetForm }) => {
    createHandler(values);

    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createTasks({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const handleInputChange = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 15,
        })
      );
  };

  const handleInputChangeUser = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 15,
          groups: selectedGroup._id,
        })
      );
  };

  const handleInputChangeStartDate = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 15,
          firstDate: lastWeek,
        })
      );
  };

  const handleInputChangeInstance = (e) => {
    e !== "" &&
      dispatch(
        listInstances({
          name: e,
          pageNumber: 1,
          pageSize: 15,
          system: selectedSystem._id,
        })
      );
  };

  const onChangeTaskModel = (setFieldValue, values, value, object) => {
    const tempStatus = status.find((element) => element.number === 0);
    const tempStep = value.steps.find((element) => element.number === 1);

    setSelectedTaskModel(value);

    setFieldValue("system", "");
    setFieldValue("instance", "");
    setFieldValue("responsibleUser", "");
    setFieldValue("responsibleUsers", "");
    setFieldValue("responsibleGroup", "");
    setFieldValue("responsibleTeam", "");
    setFieldValue("status", tempStatus);
    setFieldValue("currentStep", tempStep || "");
    setFieldValue("description", object.description);
    setFieldValue("responsibleGroups", object.groups);
    setFieldValue("responsibleTeams", object.taskTheme.teams);
  };

  const onChangeSystem = (setFieldValue, values, value, object) => {
    value !== "" &&
      dispatch(
        listInstances({
          name: "",
          pageNumber: 1,
          pageSize: 15,
          system: value._id,
        })
      );
    setFieldValue("instance", "");
  };

  const onChangeGroup = (setFieldValue, values, value, object) => {
    setSelectedGroup(object);
    setFieldValue("responsibleUser", "");
    setFieldValue("responsibleUsers", "");
    setFieldValue("responsibleTeam", object.team);
  };

  const allWeekHandler = (values, label, setFieldValue, resetForm, item) => {
    setFetchWeek(!fretchWeek);

    dispatch(
      listWeeks({
        firstDate: lastWeek,
        pageNumber: 1,
        pageSize: 53,
      })
    );
    setFieldValue("startWeek", weeks);
  };

  const addOneHandler = (setFieldValue, values) => {
    props.history.push(`/task/${null}/edit`);
  };

  const updateTaskHandler = (taskId) => {
    props.history.push(`/task/${taskId}/edit`);
  };

  const deleteHandler = (taskId) => {
    if (window.confirm("Are you sure to delete?")) {
      setNewTasks((oldValues) => {
        return oldValues.filter((task) => task._id !== taskId);
      });

      dispatch(deleteTask(taskId));
    }
  };

  const object = (objectID, table) => {
    const object = table.find((s) => s._id === objectID);
    return object?.name;
  };

  const tasksHeadCells = [
    {
      field: "reference",
      headerName: "Reference",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div>
          <Link to={`/subtask/${params.row._id}/edit`}>
            <button className="itemListEdit">{params.row.reference}</button>
          </Link>
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      type: "string",
      headerClassName: "headeritem",
    },

    {
      field: "taskModel",
      headerName: "Task Model",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">
          {object(params.row.taskModel, taskModels)}
        </div>
      ),
    },

    {
      field: "instance",
      headerName: "Instance",
      flex: 0.7,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">
          {object(params.row?.instance, instances)}
        </div>
      ),
      type: "string",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 0.7,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="row">
          <p>{moment(params.value).locale("fr").format("DD/MM/YY")}</p>
        </div>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 0.7,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="row">
          <p>{moment(params.value).locale("fr").format("DD/MM/YY")}</p>
        </div>
      ),
    },
    {
      field: "dedline",
      headerName: "Dedline",
      flex: 0.7,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="row">
          <p>{moment(params.value).locale("fr").format("DD/MM/YY")}</p>
        </div>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{object(params.row?.status, status)}</div>
      ),
    },
    {
      field: "responsibleUser",
      headerName: "Responsible User",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">
          {object(params.row?.responsibleUser, users)}
        </div>
      ),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="lg">
          <div className={classes.formWrapper}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={FORM_VALIDATION}
              onSubmit={submitHandler}
            >
              <Form>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={9}>
                    <Typography variant="h1" className={classes.title}>
                      {"Add Multiple Tasks"}
                    </Typography>
                  </Grid>
                  <>
                    <Grid item xs={2.5}>
                      <Typography variant="h2" className={classes.subtitle}>
                        {"Add Multiple Tasks"}
                      </Typography>
                    </Grid>

                    <Grid item xs={0.5}>
                      <AppCheckboxForm
                        name="addMany"
                        required={true}
                        instruction={addOneHandler}
                      />
                    </Grid>
                  </>

                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Tasks Added Successfully"}
                  />

                  <ActionStatus
                    loading={loadingDelete}
                    error={errorDelete}
                    success={successDelete}
                    message={"Task Deleted Successfully"}
                  />

                  <GridContainer title={"Task Description"}>
                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          setSelectedOptions={setSelectedTaskModel}
                          instruction={onChangeTaskModel}
                          onInputChange={(e) => {
                            handleInputChange(e, listTaskModels);
                          }}
                          options={taskModels && taskModels}
                          required={true}
                          isDisabled={false}
                          isMulti={false}
                          isSearchable
                          name="taskModel"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"Task Model"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          setSelectedOptions={setSelectedSystems}
                          instruction={onChangeSystem}
                          options={
                            selectedTaskModel && selectedTaskModel.systems
                          }
                          isMulti={false}
                          required={true}
                          isDisabled={selectedTaskModel === ""}
                          isSearchable
                          name="system"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"System"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={handleInputChangeInstance}
                          options={instances && instances}
                          required={true}
                          isMulti={true}
                          isSearchable
                          isDisabled={selectedSystem === ""}
                          name="instance"
                          loading={loadingInstance}
                          error={errorInstance}
                          label={"Instances"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listStatuss);
                          }}
                          options={status && status}
                          required={true}
                          isMulti={false}
                          isDisabled={true}
                          isSearchable
                          name="status"
                          loading={loadingStatus}
                          error={errorStatus}
                          label={"Status"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          options={selectedTaskModel?.steps}
                          required={true}
                          isMulti={false}
                          isDisabled={true}
                          isSearchable
                          name="currentStep"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"First Step"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextAreaForm
                        aria-label="empty textarea"
                        label="Short Description"
                        placeholder="Short Description ..."
                        minRows={1}
                        maxRows={5}
                        required={true}
                        name={"shortDescription"}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextAreaForm
                        aria-label="empty textarea"
                        label="Description"
                        placeholder="Description ..."
                        minRows={5}
                        maxRows={40}
                        required={true}
                        name={"description"}
                        disabled
                      />
                    </Grid>
                  </GridContainer>

                  <GridContainer
                    title={"Task Date"}
                    headerButton={
                      <LinkFormButton
                        label="All Weeks"
                        onPress={allWeekHandler}
                      />
                    }
                  >
                    <Grid item xs={8} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChangeStartDate(e, listWeeks);
                          }}
                          options={weeks && weeks}
                          required={true}
                          isMulti={true}
                          isSearchable
                          name="startWeek"
                          loading={loadingWeek}
                          error={errorWeek}
                          label={"Start Weeks"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={2} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          options={startFrom && startFrom}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="startFrom"
                          placeholder={"One Day"}
                          label={"Starting Day"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          options={durations && durations}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="duration"
                          label={"Duration"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer title={"Responsible User"}>
                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          instruction={onChangeGroup}
                          options={selectedTaskModel?.groups}
                          isMulti={false}
                          isDisabled={!selectedTaskModel}
                          isSearchable
                          name="responsibleGroup"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"Responsible Group"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          options={selectedTaskModel?.groups}
                          isMulti={true}
                          isDisabled={true}
                          isSearchable
                          name="responsibleGroups"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"Responsible Groups"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChangeUser(e, listUsers);
                          }}
                          options={users && users}
                          isMulti={false}
                          isDisabled={!selectedGroup}
                          isSearchable
                          name="responsibleUser"
                          loading={loadingUser}
                          error={errorUser}
                          label={"Responsible User"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChangeUser(e, listUsers);
                          }}
                          options={users && users}
                          isDisabled={!selectedGroup}
                          isMulti={true}
                          isSearchable
                          name="responsibleUsers"
                          loading={loadingUser}
                          error={errorUser}
                          label={"Responsible Users"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          options={selectedTaskModel?.taskTheme?.teams}
                          isMulti={false}
                          isDisabled={true}
                          isSearchable
                          name="responsibleTeam"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"Responsible Team"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          options={selectedTaskModel?.Teams}
                          isMulti={true}
                          isDisabled={true}
                          isSearchable
                          name="responsibleTeams"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"Responsible Teams"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>{"Add Tasks"}</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <FormButton onPress={() => setOpen(true)}>
                        Referech
                      </FormButton>
                    </Grid>
                  </GridContainer>

                  <AppDialog
                    message={"Do you want to refresh the page ?    "}
                    title={"Refresh ?"}
                    agree={"Refresh"}
                    onClose={refrechAll}
                    open={open}
                    setOpen={setOpen}
                  />
                </Grid>
              </Form>
            </Formik>
          </div>
          {newTasks && (
            <AppDataGrid
              columns={tasksHeadCells}
              tableRows={newTasks}
              page={0}
              pageSize={15}
              rowCount={newTasks?.length}
              loading={loadingCreate}
              error={errorCreate}
              onUpdatePress={updateTaskHandler}
              onDeletePress={deleteHandler}
            />
          )}
        </Container>
      </Grid>
    </Grid>
  );
}
