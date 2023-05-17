import React, { useEffect, useState } from "react";
// import "./Week.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import { createManyWeeks } from "../../redux/actions/weekActions";
import { WEEK_CREATEMANY_RESET } from "../../redux/constants/weekConstants";
import GridContainer from "../../components/GridContainer";
import AppDialog from "../../components/FormsUI/dialog/FormDialog";
import FormButton from "../../components/FormsUI/button/FormButton";
import {
  Container,
  Grid,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import { ActionStatus } from "../../components/ActionStatus";
import AppDateTimePickerForm from "../../components/FormsUI/AppDateTimePickerFrom/AppDateTimePickerForm";

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
  startDate: Yup.date().required("Please Enter Start Date "),
  endDate: Yup.date().required("Please Enter End Date "),
});

export default function WeeksEditScreen(props) {
  const [open, setOpen] = React.useState(false);

  const [initialValues] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const classes = useStyles();

  const weeksCreate = useSelector((state) => state.weeksCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = weeksCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: WEEK_CREATEMANY_RESET });
      }, 2000);
    }
  }, [dispatch, successCreate]);

  const submitHandler = (values, { resetForm }) => {
    createHandler(values);

    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createManyWeeks({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
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
                      Add Many Weeks
                    </Typography>
                  </Grid>

                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Weeks Created Successfuly"}
                  />

                  <GridContainer title={"Weeks Dates"}>
                    <Grid item xs={4} className={classes.formField}>
                      <AppDateTimePickerForm
                        label={"Start Date"}
                        name={"startDate"}
                        required={true}
                        instruction={onChangeStartDate}
                      />
                    </Grid>
                    <Grid item xs={4} className={classes.formField}>
                      <AppDateTimePickerForm
                        label={"End Date"}
                        name={"endDate"}
                        required={true}
                        instruction={onChangeEndDate}
                      />
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button> Add Many Weeks </Button>
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
