import React, { useEffect, useState } from "react";
// import "./Calender.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsCalender,
  updateCalender,
  createCalender,
} from "../../redux/actions/calenderActions";
import {
  CALENDER_CREATE_RESET,
  CALENDER_UPDATE_RESET,
} from "../../redux/constants/calenderConstants";
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
import { listUsers } from "../../redux/actions/userActions";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";
import { listWeeks } from "../../redux/actions/weekActions";

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
  user: Yup.object().required("Please Select User"),
  week: Yup.object().required("Please Select Week"),
});

export default function CalenderEditScreen(props) {
  const calenderId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    user: "",
    week: "",
  });

  const classes = useStyles();

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const weekList = useSelector((state) => state.weekList);
  const { loading: loadingWeeks, error: errorWeeks, weeks } = weekList;

  const calenderDetails = useSelector((state) => state.calenderDetails);
  const { loading, error, calender } = calenderDetails;

  const calenderUpdate = useSelector((state) => state.calenderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = calenderUpdate;

  const calenderCreate = useSelector((state) => state.calenderCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = calenderCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: CALENDER_CREATE_RESET });
      }, 2000);
    }

    dispatch(listUsers({}));
    dispatch(listWeeks({}));
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/calenderlist");
    }

    if (
      calenderId &&
      (!calender || calender._id !== calenderId || successUpdate)
    ) {
      dispatch(detailsCalender(calenderId));
    } else if (!calenderId) {
      dispatch({ type: CALENDER_UPDATE_RESET });
    } else {
      setInitialValues({
        name: calender ? calender.name : "",
        description: calender ? calender.description : "",
        user: calender ? calender.user : "",
        week: calender ? calender.week : "",
      });
    }
  }, [calender, dispatch, calenderId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!calenderId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createCalender({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values) => {
    dispatch(
      updateCalender({
        _id: calenderId,
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
                  alignWeeks="center"
                >
                  <Grid week xs={9}>
                    <Typography variant="h1" className={classes.title}>
                      {!calenderId ? "Add Calender" : "Update Calender : "}
                    </Typography>
                  </Grid>

                  <ActionStatus loading={loading && calenderId} error={error} />
                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Calender Created Successfuly"}
                  />
                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"Calender Updated Successfuly"}
                  />

                  <GridContainer title={"Calender Details"}>
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

                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listUsers);
                          }}
                          options={users}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="user"
                          loading={loadingUser}
                          error={errorUser}
                          label={"User"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={9} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listWeeks);
                          }}
                          options={weeks}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="week"
                          loading={loadingWeeks}
                          error={errorWeeks}
                          label={"Week"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>
                        {!calenderId ? "Add Calender" : "Update Calender"}
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
