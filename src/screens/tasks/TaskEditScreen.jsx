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
import {
  createTask,
  deleteTask,
  detailsTask,
  updateTask,
} from "../../redux/actions/taskActions";
import {
  TASK_CREATE_RESET,
  TASK_UPDATE_RESET,
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
import AppDateTimePickerForm from "../../components/FormsUI/AppDateTimePickerFrom/AppDateTimePickerForm";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";
import { listUsers } from "../../redux/actions/userActions";
import { listStatuss } from "../../redux/actions/statusActions";
import { ActionStatus } from "../../components/ActionStatus";
import AppCheckboxForm from "../../components/FormsUI/AppCheckboxFrom/AppCheckboxForm";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { Link } from "react-router-dom";

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
  taskModel: Yup.object().required("Please Choose Task Model"),
  currentStep: Yup.object().required("Please Choose Current Step"),
  status: Yup.object().required("Please Choose Status"),
  system: Yup.object().required("Please Choose System"),
  instance: Yup.object().required("Please Choose Instance"),
  startWeek: Yup.object().required("Please Choose Start Week"),
  endWeek: Yup.object().required("Please Choose End Week"),
  startDate: Yup.date().required("Please Enter Start Date "),
  endDate: Yup.date().required("Please Enter End Date "),
  closedDate: Yup.date().required("Please Enter Close Date "),
  dedline: Yup.date().required("Please Enter Dedline "),
  addMany: Yup.boolean(),
  responsibleGroup: Yup.object().required("Please Choose Responsible Group"),
  responsibleGroups: Yup.array().required("Please Choose Responsible Groups"),
  responsibleTeam: Yup.object().required("Please Choose Responsible Team"),
  responsibleTeams: Yup.array().required("Please Choose Responsible Teams"),
});

function lastweek() {
  var lastweek = moment().startOf("week").format("YYYY-MM-DD");

  return lastweek;
}

export default function TaskEditScreen(props) {
  const taskId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [initialValues, setInitialValues] = useState({
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
    salePrice: "",
    closedDate: "",
    dedline: "",
    createdBy: "",
    responsibleUser: "",
    responsibleUsers: "",
    responsibleGroup: "",
    responsibleGroups: "",
    responsibleTeam: "",
    responsibleTeams: "",
    status: "",
    addMany: false,
  });

  const [open, setOpen] = React.useState(false);

  const [lastWeek] = useState(lastweek());
  const [selectedSystem, setSelectedSystems] = useState("");
  const [selectedTaskModel, setSelectedTaskModel] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reference, setReference] = useState("");
  const [newTask, setNewTask] = useState();

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

  const taskCreate = useSelector((state) => state.taskCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    task: createdTask,
  } = taskCreate;

  const taskDetails = useSelector((state) => state.taskDetails);
  const { loading, error, task } = taskDetails;

  const taskUpdate = useSelector((state) => state.taskUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskUpdate;

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
        pageSize: 15,
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
        createdTask && setNewTask(createdTask);
        dispatch({ type: TASK_CREATE_RESET });
      }, 2000);
    }
  }, [dispatch, successCreate, createdTask]);

  useEffect(() => {
    if (taskId && (!task || task._id !== taskId || successUpdate)) {
      dispatch(detailsTask(taskId));
    } else if (!taskId) {
      dispatch({ type: TASK_UPDATE_RESET });
    } else {
      setInitialValues({
        description: task ? task.description : "",
        shortDescription: task ? task.shortDescription : "",
        reference: task ? task.reference : "",
        taskModel: task ? task.taskModel : "",
        currentStep: task ? task.currentStep : "",
        system: task ? task.system : "",
        instance: task ? task.instance : "",
        startDate: task ? task.startDate : "",
        startWeek: task ? task.startWeek : "",
        endDate: task ? task.endDate : "",
        endWeek: task ? task.endWeek : "",
        closedDate: task ? task.closedDate : "",
        dedline: task ? task.dedline : "",
        responsibleUser: task ? task.responsibleUser : "",
        responsibleUsers: task ? task.responsibleUsers : "",
        responsibleGroup: task ? task.responsibleGroup : "",
        responsibleGroups: task ? task.responsibleGroups : "",
        responsibleTeam: task ? task.responsibleTeam : "",
        responsibleTeams: task ? task.responsibleTeams : "",
        status: task ? task.status : "",
      });

      task && taskId && setSelectedTaskModel(task.taskModel);
      setStartDate(task.startWeek);
      setEndDate(task.endWeek);
      setReference(task.reference);
      setSelectedGroup(task.responsibleGroup);
    }
  }, [task, dispatch, taskId, successUpdate]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        setNewTask("");
        dispatch({ type: TASK_DELETE_RESET });
      }, 2000);
    }
    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: TASK_UPDATE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete, successUpdate]);

  const submitHandler = (values, { resetForm }) => {
    if (!taskId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createTask({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values) => {
    dispatch(
      updateTask({
        _id: taskId,
        ...values,
      })
    );
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
          lastDate: endDate && endDate.startDate,
        })
      );
  };

  const handleInputChangeEndDate = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 15,
          firstDate: startDate ? startDate.endDate : lastWeek,
          lastDate: "",
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

  const onChangeStartWeek = (setFieldValue, values, value, object) => {
    object !== "" &&
      dispatch(
        listWeeks({
          name: "",
          pageNumber: 1,
          pageSize: 15,
          firstDate: object.endDate,
          lastDate: endDate && endDate.endDate,
        })
      );
    setFieldValue("startDate", object.startDate);
  };

  const onChangeEndWeek = (setFieldValue, values, value, object) => {
    object !== "" &&
      dispatch(
        listWeeks({
          name: "",
          pageNumber: 1,
          pageSize: 15,
          firstDate: startDate && startDate.startDate,
          lastDate: object.startDate,
        })
      );
    setFieldValue("endDate", object.endDate);
    setFieldValue("closedDate", object.endDate);
    setFieldValue("dedline", object.endDate);
  };

  const onChangeStartDate = (setFieldValue, values, value, object) => {
    if (values["endDate"] && values["endDate"] < value) {
      setFieldValue("startDate", values["endDate"]);
    }
  };

  const onChangeEndDate = (setFieldValue, values, value, object) => {
    if (values["startDate"] && values["startDate"] > value) {
      setFieldValue("endDate", values["startDate"]);
    }
    setFieldValue("dedline", value);
  };

  const onChangeDedline = (setFieldValue, values, value, object) => {
    if (values["startDate"] && values["startDate"] > value) {
      setFieldValue("dedline", values["startDate"]);
    } else if (values["endDate"] && values["endDate"] < value) {
      setFieldValue("dedline", values["endDate"]);
    }
  };

  const onChangeGroup = (setFieldValue, values, value, object) => {
    setSelectedGroup(object);
    setFieldValue("responsibleUser", "");
    setFieldValue("responsibleUsers", "");
    setFieldValue("responsibleTeam", object.team);
  };

  const addManyHandler = (setFieldValue, values) => {
    props.history.push(`/tasks/${null}/edit`);
  };

  const updateTaskHandler = (taskId) => {
    props.history.push(`/task/${taskId}/edit`);
  };

  const deleteHandler = (taskId) => {
    if (window.confirm("Are you sure to delete?")) {
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
                      {!taskId ? "Add Task" : "Update Task : " + reference}
                    </Typography>
                  </Grid>
                  {!taskId && (
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
                          instruction={addManyHandler}
                        />
                      </Grid>
                    </>
                  )}

                  <ActionStatus loading={loading && taskId} error={error} />

                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Task Added Successfully"}
                  />

                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"Task Updated Successfully"}
                  />

                  <ActionStatus
                    loading={loadingDelete}
                    error={errorDelete}
                    success={successDelete}
                    message={"Task Deleted Successfully"}
                  />

                  <GridContainer title={"Task Description"}>
                    <Grid item xs={4} className={classes.formField}>
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
                          isDisabled={taskId}
                          isMulti={false}
                          isSearchable
                          name="taskModel"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"Task Model"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={4} className={classes.formField}>
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
                          isDisabled={selectedTaskModel === "" || taskId}
                          isSearchable
                          name="system"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"System"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={4} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={handleInputChangeInstance}
                          options={instances && instances}
                          required={true}
                          isMulti={false}
                          isSearchable
                          isDisabled={selectedSystem === ""}
                          name="instance"
                          loading={loadingInstance}
                          error={errorInstance}
                          label={"Instance"}
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
                          isDisabled={!taskId}
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

                  <GridContainer title={"Task Date"}>
                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          setSelectedOptions={setStartDate}
                          instruction={onChangeStartWeek}
                          onInputChange={(e) => {
                            handleInputChangeStartDate(e, listWeeks);
                          }}
                          options={weeks && weeks}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="startWeek"
                          loading={loadingWeek}
                          error={errorWeek}
                          label={"Start Week"}
                          getOptionLabel={({ description }) => description}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <AppDateTimePickerForm
                        minDate={moment(
                          startDate && startDate.startDate
                        ).format("YYYY-MM-DD")}
                        maxDate={moment(endDate && endDate.endDate).format(
                          "YYYY-MM-DD"
                        )}
                        label={"Start Date"}
                        name={"startDate"}
                        required={true}
                        instruction={onChangeStartDate}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <AppDateTimePickerForm
                        minDate={moment(
                          startDate && startDate.startDate
                        ).format("YYYY-MM-DD")}
                        maxDate={moment(endDate && endDate.endDate).format(
                          "YYYY-MM-DD"
                        )}
                        disabled={startDate === ""}
                        required={true}
                        label={"Dedline"}
                        name={"dedline"}
                        instruction={onChangeDedline}
                      />
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          setSelectedOptions={setEndDate}
                          instruction={onChangeEndWeek}
                          onInputChange={(e) => {
                            handleInputChangeEndDate(e, listWeeks);
                          }}
                          options={weeks && weeks}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="endWeek"
                          loading={loadingWeek}
                          error={errorWeek}
                          label={"End Week"}
                          getOptionLabel={({ description }) => description}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <AppDateTimePickerForm
                        minDate={moment(
                          startDate && startDate.startDate
                        ).format("YYYY-MM-DD")}
                        maxDate={moment(endDate && endDate.endDate).format(
                          "YYYY-MM-DD"
                        )}
                        disabled={endDate === ""}
                        label={"End Date"}
                        name={"endDate"}
                        required={true}
                        instruction={onChangeEndDate}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <AppDateTimePickerForm
                        minDate={moment(
                          startDate && startDate.startDate
                        ).format("YYYY-MM-DD")}
                        maxDate={moment(endDate && endDate.endDate).format(
                          "YYYY-MM-DD"
                        )}
                        disabled={true}
                        label={"Close Date"}
                        required={true}
                        name={"closedDate"}
                      />
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
                      <Button>{!taskId ? "Add Task" : "Update Task"}</Button>
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
          {newTask && (
            <AppDataGrid
              columns={tasksHeadCells}
              tableRows={newTask}
              page={0}
              pageSize={1}
              rowCount={1}
              containerHeight={200}
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
