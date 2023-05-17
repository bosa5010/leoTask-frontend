import React, { useEffect, useState } from "react";
import "./user.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  register,
  detailsUser,
  updateUser,
} from "../../redux/actions/userActions";
import {
  USER_REGISTER_RESET,
  USER_UPDATE_RESET,
} from "../../redux/constants/userConstants";
import GridContainer from "../../components/GridContainer";
import AppDialog from "../../components/FormsUI/dialog/FormDialog";
import FormButton from "../../components/FormsUI/button/FormButton";
import {
  Container,
  Grid,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import ReactSelectForm from "../../components/FormsUI/ReactSelect/ReactSelectForm";
import { listTeams } from "../../redux/actions/teamActions";
import AppInputForm from "../../components/FormsUI/AppInputFrom/AppInputForm";
import AppCheckboxForm from "../../components/FormsUI/AppCheckboxFrom/AppCheckboxForm";
import { ActionStatus } from "../../components/ActionStatus";

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
  firstName: Yup.string().required("Please Enter First Name"),
  lastName: Yup.string().required("Please Enter Last Name"),
  name: Yup.string().required("Please Enter Name"),
  userName: Yup.string().required("Please Enter User Name"),
  email: Yup.string().email().required("Please Enter un email"),
  password: Yup.string(),
  isAdmin: Yup.boolean(),
  isSuperAdmin: Yup.boolean(),

  team: Yup.object().required("Please Select team"),
  managedTeams: Yup.array().when("isAdmin", {
    is: true,
    then: Yup.array().required("Please Select Managed team"),
  }),
});

export default function UserEditScreen(props) {
  const userId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [initialValues, setInitialValues] = useState({
    lastName: "",
    firstName: "",
    name: "",
    userName: "",
    email: "",
    password: "",
    isAdmin: false,
    isSuperAdmin: false,
    team: "",
    managedTeam: [],
  });

  const [open, setOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(true);

  const classes = useStyles();

  const teamList = useSelector((state) => state.teamList);
  const { loading: loadingTeam, error: errorTeam, teams } = teamList;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = userRegister;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: USER_REGISTER_RESET });
      }, 2000);
    }

    dispatch(listTeams({ name: "", pageNumber: 1, pageSize: 15 }));
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/userlist");
    }

    if (userId && (!user || user._id !== userId || successUpdate)) {
      dispatch(detailsUser(userId));
    } else if (!userId) {
      dispatch({ type: USER_UPDATE_RESET });
    } else {
      setInitialValues({
        firstName: user ? user.firstName : "",
        lastName: user ? user.lastName : "",
        name: user ? user.name : "",
        userName: user ? user.userName : "",
        email: user ? user.email : "",
        password: user ? user.password : "",
        isAdmin: user ? user.isAdmin : "",
        isSuperAdmin: user ? user.isSuperAdmin : "",
        team: user ? user.team : "",
        managedTeams: user ? user.managedTeams : "",
      });
      setIsAdmin(user && !user.isAdmin);
    }
  }, [user, dispatch, userId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!userId) {
      createHandler(values, resetForm);
    } else {
      updateHandler(values, resetForm);
    }
  };

  const createHandler = (values, resetForm) => {
    if (values?.isAdmin && values.managedTeams) {
      dispatch(register({ ...values }));
      resetForm();
    } else if (!values?.isAdmin) {
      dispatch(register({ ...values }));
      resetForm();
    }
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values, resetForm) => {
    dispatch(
      updateUser({
        _id: userId,
        ...values,
      })
    );
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

  const onChangeUserName = (setFieldValue, values, value, object) => {
    !userId && setFieldValue("password", value);
  };

  const onChangeFirstName = (setFieldValue, values, value, object) => {
    setFieldValue("name", values["lastName"] + " " + object.target.value);
  };

  const onChangeLastName = (setFieldValue, values, value, object) => {
    setFieldValue("name", object.target.value + " " + values["firstName"]);
  };

  const onChangeIsAdmin = (setFieldValue, values) => {
    if (values["isAdmin"]) {
      setFieldValue("isSuperAdmin", !values["isAdmin"]);
      setFieldValue("managedTeams", []);
    }
    setIsAdmin(values["isAdmin"]);
  };

  const onChangeIsSuperAdmin = (setFieldValue, values) => {
    if (!values["isSuperAdmin"]) {
      setFieldValue("isAdmin", !values["isSuperAdmin"]);
      setIsAdmin(false);
    }
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
                      {!userId ? "Add User" : "Update User : "}
                    </Typography>
                  </Grid>

                  <ActionStatus loading={loading && userId} error={error} />
                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"User Created Successfuly"}
                  />
                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"User Updated Successfuly"}
                  />

                  <GridContainer title={"User Info"}>
                    <Grid item xs={6}>
                      <AppInputForm
                        name="lastName"
                        label="Last Name"
                        required={true}
                        instruction={onChangeLastName}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <AppInputForm
                        name="firstName"
                        label="First Name"
                        required={true}
                        instruction={onChangeFirstName}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <AppInputForm
                        name="userName"
                        label="User Name"
                        type="text"
                        required={true}
                        instruction={onChangeUserName}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <AppInputForm
                        name="email"
                        label="Email"
                        required={true}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <AppInputForm
                        name="name"
                        label="Name"
                        type="text"
                        required={true}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <AppInputForm
                        name="password"
                        label="Password"
                        type="password"
                        required={true}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <AppCheckboxForm
                        name="isAdmin"
                        label="Is Admin"
                        required={true}
                        instruction={onChangeIsAdmin}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <AppCheckboxForm
                        name="isSuperAdmin"
                        label="Is Super Admin"
                        required={true}
                        instruction={onChangeIsSuperAdmin}
                      />
                    </Grid>
                    <Grid item xs={4} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listTeams);
                          }}
                          options={teams}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="team"
                          loading={loadingTeam}
                          error={errorTeam}
                          label={"Team"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={4} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          onInputChange={(e) => {
                            handleInputChange(e, listTeams);
                          }}
                          options={teams}
                          required={true}
                          isMulti={true}
                          isDisabled={isAdmin}
                          isSearchable
                          name="managedTeams"
                          loading={loadingTeam}
                          error={errorTeam}
                          label={"Managed Teams"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>{!userId ? "Add User" : "Update User"}</Button>
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
