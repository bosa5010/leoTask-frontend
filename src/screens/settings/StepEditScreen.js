import React, { useEffect, useState } from "react";
// import "./Step.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsStep,
  updateStep,
  createStep,
} from "../../redux/actions/stepActions";
import {
  STEP_CREATE_RESET,
  STEP_UPDATE_RESET,
} from "../../redux/constants/stepConstants";
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
import { listTaskModels } from "../../redux/actions/taskModelActions";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";
import { listItems } from "../../redux/actions/itemActions";

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
  number: Yup.number().required("Please Enter Number"),
  // taskModel: Yup.object(),
  items: Yup.array().required("Please Select Items"),
});

export default function StepEditScreen(props) {
  const stepId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    number: "",
    taskModel: null,
    items: "",
  });

  const classes = useStyles();

  const taskModelList = useSelector((state) => state.taskModelList);
  const {
    loading: loadingTaskModel,
    error: errorTaskModel,
    taskModels,
  } = taskModelList;

  const itemList = useSelector((state) => state.itemList);
  const { loading: loadingItems, error: errorItems, items } = itemList;

  const stepDetails = useSelector((state) => state.stepDetails);
  const { loading, error, step } = stepDetails;

  const stepUpdate = useSelector((state) => state.stepUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = stepUpdate;

  const stepCreate = useSelector((state) => state.stepCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = stepCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: STEP_CREATE_RESET });
      }, 2000);
    }

    dispatch(listTaskModels({ name: "", pageNumber: 1, pageSize: 15 }));
    dispatch(listItems({ name: "", pageNumber: 1, pageSize: 15 }));
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/steplist");
    }

    if (stepId && (!step || step._id !== stepId || successUpdate)) {
      dispatch(detailsStep(stepId));
    } else if (!stepId) {
      dispatch({ type: STEP_UPDATE_RESET });
    } else {
      setInitialValues({
        name: step ? step.name : "",
        description: step ? step.description : "",
        number: step ? step.number : "",
        taskModel: step ? step.taskModel : "",
        items: step ? step.items : "",
      });
    }
  }, [step, dispatch, stepId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!stepId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createStep({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values) => {
    dispatch(
      updateStep({
        _id: stepId,
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

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="sm">
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
                      {!stepId ? "Add Step" : "Update Step : "}
                    </Typography>
                  </Grid>

                  <ActionStatus loading={loading && stepId} error={error} />
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

                  <GridContainer title={"Step Details"}>
                    <Grid item xs={9}>
                      <AppInputForm name="name" label="Name" required={true} />
                    </Grid>

                    <Grid item xs={9}>
                      <TextAreaForm
                        aria-label="empty textarea"
                        placeholder="Description ..."
                        minRows={5}
                        maxRows={40}
                        required={true}
                        name={"description"}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <AppInputForm
                        name="number"
                        label="Number"
                        required={true}
                        type={"number"}
                        min={1}
                      />
                    </Grid>

                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listTaskModels);
                          }}
                          options={taskModels}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="taskModel"
                          loading={loadingTaskModel}
                          error={errorTaskModel}
                          label={"Task Model"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listItems);
                          }}
                          options={items}
                          required={true}
                          isMulti={true}
                          isSearchable
                          name="items"
                          loading={loadingItems}
                          error={errorItems}
                          label={"Items"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>{!stepId ? "Add Step" : "Update Step"}</Button>
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
