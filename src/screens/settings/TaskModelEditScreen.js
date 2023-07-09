import React, { useEffect, useState } from "react";
// import "./TaskModel.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsTaskModel,
  updateTaskModel,
  createTaskModel,
} from "../../redux/actions/taskModelActions";
import {
  TASKMODEL_CREATE_RESET,
  TASKMODEL_UPDATE_RESET,
} from "../../redux/constants/taskModelConstants";
import GridContainer from "../../components/GridContainer";
import AppDialog from "../../components/FormsUI/dialog/FormDialog";
import FormButton from "../../components/FormsUI/button/FormButton";
import {
  Container,
  Grid,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import ReactSelectForm from "../../components/FormsUI/ReactSelect/ReactSelectForm";
import AppInputForm from "../../components/FormsUI/AppInputFrom/AppInputForm";
import { ActionStatus } from "../../components/ActionStatus";
import { listTaskThemes } from "../../redux/actions/taskThemeActions";
import { listSteps } from "../../redux/actions/stepActions";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";
import { listSystems } from "../../redux/actions/systemActions";
import { listGroups } from "../../redux/actions/groupActions";
import { objectId } from "../../utils";

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
  name: Yup.string().required("Please Enter Name"),
  description: Yup.string().required("Please Enter Description"),
  taskTheme: Yup.object().required("Please Select Task Theme"),
  groups: Yup.array().required("Please Select Groups"),
  steps: Yup.array().required("Please Select Steps"),
  systems: Yup.array().required("Please Select Systems"),
});

export default function TaskModelEditScreen(props) {
  const taskModelId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    taskTheme: "",
    groups: "",
    steps: "",
    systems: "",
  });

  const classes = useStyles();

  const taskThemeList = useSelector((state) => state.taskThemeList);
  const {
    loading: loadingTaskTheme,
    error: errorTaskTheme,
    taskThemes,
  } = taskThemeList;

  const stepList = useSelector((state) => state.stepList);
  const { loading: loadingSteps, error: errorSteps, steps } = stepList;

  const groupList = useSelector((state) => state.groupList);
  const { loading: loadingGroup, error: errorGroup, groups } = groupList;

  const systemList = useSelector((state) => state.systemList);
  const { loading: loadingSystems, error: errorSystems, systems } = systemList;

  const taskModelDetails = useSelector((state) => state.taskModelDetails);
  const { loading, error, taskModel } = taskModelDetails;

  const taskModelUpdate = useSelector((state) => state.taskModelUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = taskModelUpdate;

  const taskModelCreate = useSelector((state) => state.taskModelCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = taskModelCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: TASKMODEL_CREATE_RESET });
      }, 2000);
    }

    dispatch(listTaskThemes({ name: "", pageNumber: 1, pageSize: 15 }));

    dispatch(listSteps({ name: "", pageNumber: 1, pageSize: 15 }));

    dispatch(listSystems({ name: "", pageNumber: 1, pageSize: 15 }));
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/taskmodelist");
    }

    if (
      taskModelId &&
      (!taskModel || taskModel._id !== taskModelId || successUpdate)
    ) {
      dispatch(detailsTaskModel(taskModelId));
    } else if (!taskModelId) {
      dispatch({ type: TASKMODEL_UPDATE_RESET });
    } else {
      setInitialValues({
        name: taskModel ? taskModel.name : "",
        description: taskModel ? taskModel.description : "",
        taskTheme: taskModel ? taskModel.taskTheme : "",
        groups: taskModel ? taskModel.groups : "",
        steps: taskModel ? taskModel.steps : "",
        systems: taskModel ? taskModel.systems : "",
      });
      setSelectedTeam(taskModel.taskThem);
    }
  }, [taskModel, dispatch, taskModelId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!taskModelId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createTaskModel({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values) => {
    dispatch(
      updateTaskModel({
        _id: taskModelId,
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

  const onChangeTaskTheme = (setFieldValue, values, value, object) => {
    setFieldValue("groups", "");
  };

  useEffect(() => {
    dispatch(
      listGroups({
        name: "",
        pageNumber: 1,
        pageSize: 15,
        team: objectId(selectedTeam?.teams),
      })
    );
  }, [dispatch, selectedTeam]);

  const handleInputChangeGroup = (e) => {
    e !== "" &&
      dispatch(
        listGroups({
          name: e,
          pageNumber: 1,
          pageSize: 15,
          team: objectId(selectedTeam.teams),
        })
      );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
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
                      {!taskModelId ? "Add Task Model" : "Update Task Model : "}
                    </Typography>
                  </Grid>

                  <ActionStatus
                    loading={loading && taskModelId}
                    error={error}
                  />
                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Task Model Created Successfuly"}
                  />
                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"Task Model Updated Successfuly"}
                  />

                  <GridContainer title={"Task Model Details"}>
                    <Grid item xs={9}>
                      <AppInputForm name="name" label="Name" required={true} />
                    </Grid>

                    <Grid item xs={9}>
                      <TextAreaForm
                        aria-label="empty textarea"
                        placeholder="Description ..."
                        minRows={5}
                        maxRows={40}
                        name={"description"}
                      />
                    </Grid>

                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          setSelectedOptions={setSelectedTeam}
                          onInputChange={(e) => {
                            handleInputChange(e, listTaskThemes);
                          }}
                          instruction={onChangeTaskTheme}
                          options={taskThemes}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="taskTheme"
                          loading={loadingTaskTheme}
                          error={errorTaskTheme}
                          label={"Task Themes"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={handleInputChangeGroup}
                          options={groups}
                          required={true}
                          isMulti={true}
                          isDisabled={selectedTeam === ""}
                          isSearchable
                          name="groups"
                          loading={loadingGroup}
                          error={errorGroup}
                          label={"Groups"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listSteps);
                          }}
                          options={steps}
                          required={true}
                          isMulti={true}
                          isSearchable
                          name="steps"
                          loading={loadingSteps}
                          error={errorSteps}
                          label={"Steps"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listSystems);
                          }}
                          options={systems}
                          required={true}
                          isMulti={true}
                          isSearchable
                          name="systems"
                          loading={loadingSystems}
                          error={errorSystems}
                          label={"Systems"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>
                        {!taskModelId ? "Add TaskModel" : "Update TaskModel"}
                      </Button>
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
        </Container>
      </Grid>
    </Grid>
  );
}
