import React, { useEffect, useState } from "react";
// import "./Week.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsWeek,
  updateWeek,
  createWeek,
} from "../../redux/actions/weekActions";
import {
  WEEK_CREATE_RESET,
  WEEK_UPDATE_RESET,
} from "../../redux/constants/weekConstants";
import GridContainer from "../../components/GridContainer";
import AppDialog from "../../components/FormsUI/dialog/FormDialog";
import FormButton from "../../components/FormsUI/button/FormButton";
import {
  Container,
  Grid,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import AppInputForm from "../../components/FormsUI/AppInputFrom/AppInputForm";
import { ActionStatus } from "../../components/ActionStatus";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";
import AppDateTimePickerForm from "../../components/FormsUI/AppDateTimePickerFrom/AppDateTimePickerForm";
import moment from "../../../node_modules/moment/moment";

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
  startDate: Yup.date().required("Please Enter Start Date "),
  endDate: Yup.date().required("Please Enter End Date "),
});

export default function WeekEditScreen(props) {
  const weekId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = useState({
    startDate: new Date(moment().startOf("year")),
  });
  const [endDate, setEndDate] = useState({
    endDate: new Date(moment().endOf("year").add(3, "years")),
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    number: "",
    startDate: new Date(moment().startOf("year")),
    endDate: new Date(moment().endOf("year")),
  });

  const classes = useStyles();

  const weekDetails = useSelector((state) => state.weekDetails);
  const { loading, error, week } = weekDetails;

  const weekUpdate = useSelector((state) => state.weekUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = weekUpdate;

  const weekCreate = useSelector((state) => state.weekCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = weekCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: WEEK_CREATE_RESET });
      }, 2000);
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/weeklist");
    }

    if (weekId && (!week || week._id !== weekId || successUpdate)) {
      dispatch(detailsWeek(weekId));
    } else if (!weekId) {
      dispatch({ type: WEEK_UPDATE_RESET });
    } else {
      setInitialValues({
        name: week ? week.name : "",
        description: week ? week.description : "",
        number: week ? week.number : "",
        startDate: week ? week.startDate : "",
        endDate: week ? week.endDate : "",
      });
    }
  }, [week, dispatch, weekId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!weekId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createWeek({ ...values }));
  };

  const updateHandler = (values) => {
    dispatch(
      updateWeek({
        _id: weekId,
        ...values,
      })
    );
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const onChangeStartDate = (setFieldValue, values, value, object) => {
    if (values["endDate"] && values["endDate"] < value) {
      setFieldValue("startDate", values["endDate"]);
      setStartDate(value);
    }
  };

  const onChangeEndDate = (setFieldValue, values, value, object) => {
    if (values["startDate"] && values["startDate"] > value) {
      setFieldValue("endDate", values["startDate"]);
      setEndDate(value);
    }
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
                      {!weekId ? "Add Week" : "Update Week : "}
                    </Typography>
                  </Grid>

                  <ActionStatus loading={loading && weekId} error={error} />
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

                  <GridContainer title={"Week Details"}>
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

                    <Grid item xs={4} className={classes.formField}>
                      <AppDateTimePickerForm
                        minDate={moment(
                          startDate && startDate.startDate
                        ).format("YYYY-MM-DD")}
                        maxDate={moment(endDate && endDate.endDate).format(
                          "YYYY-MM-DD"
                        )}
                        disabled={endDate === ""}
                        label={"Start Date"}
                        name={"startDate"}
                        required={true}
                        instruction={onChangeStartDate}
                      />
                    </Grid>
                    <Grid item xs={4} className={classes.formField}>
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
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>{!weekId ? "Add Week" : "Update Week"}</Button>
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
