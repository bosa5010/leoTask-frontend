import React, { useEffect, useState } from "react";
// import "./Instance.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsInstance,
  updateInstance,
  createInstance,
} from "../../redux/actions/instanceActions";
import {
  INSTANCE_CREATE_RESET,
  INSTANCE_UPDATE_RESET,
} from "../../redux/constants/instanceConstants";
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
import { listSystems } from "../../redux/actions/systemActions";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";

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
  system: Yup.object().required("Please Select System"),
});

export default function InstanceEditScreen(props) {
  const instanceId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    system: "",
  });

  const classes = useStyles();

  const systemList = useSelector((state) => state.systemList);
  const { loading: loadingSystem, error: errorSystem, systems } = systemList;

  const instanceDetails = useSelector((state) => state.instanceDetails);
  const { loading, error, instance } = instanceDetails;

  const instanceUpdate = useSelector((state) => state.instanceUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = instanceUpdate;

  const instanceCreate = useSelector((state) => state.instanceCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = instanceCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: INSTANCE_CREATE_RESET });
      }, 2000);
    }

    dispatch(listSystems({ name: "", pageNumber: 1, pageSize: 15 }));
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/instancelist");
    }

    if (
      instanceId &&
      (!instance || instance._id !== instanceId || successUpdate)
    ) {
      dispatch(detailsInstance(instanceId));
    } else if (!instanceId) {
      dispatch({ type: INSTANCE_UPDATE_RESET });
    } else {
      setInitialValues({
        name: instance ? instance.name : "",
        description: instance ? instance.description : "",
        system: instance ? instance.system : "",
      });
    }
  }, [instance, dispatch, instanceId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!instanceId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createInstance({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values) => {
    dispatch(
      updateInstance({
        _id: instanceId,
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
                      {!instanceId ? "Add Instance" : "Update Instance : "}
                    </Typography>
                  </Grid>

                  <ActionStatus loading={loading && instanceId} error={error} />
                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Instance Created Successfuly"}
                  />
                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"Instance Updated Successfuly"}
                  />

                  <GridContainer title={"Instance Details"}>
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
                          onInputChange={(e) => {
                            handleInputChange(e, listSystems);
                          }}
                          options={systems}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="system"
                          loading={loadingSystem}
                          error={errorSystem}
                          label={"System"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>
                        {!instanceId ? "Add Instance" : "Update Instance"}
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
