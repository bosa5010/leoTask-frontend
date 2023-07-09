import React, { useEffect, useState } from "react";
// import "./itemStatus.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsItemStatus,
  updateItemStatus,
  createItemStatus,
} from "../../redux/actions/itemStatusActions";
import {
  ITEMSTATUS_CREATE_RESET,
  ITEMSTATUS_UPDATE_RESET,
} from "../../redux/constants/itemStatusConstants";
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
  reference: Yup.string().required("Please Enter Description"),
});

export default function ItemStatusEditScreen(props) {
  const itemStatusId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    reference: "",
  });

  const classes = useStyles();

  const itemStatusDetails = useSelector((state) => state.itemStatusDetails);
  const { loading, error, itemStatus } = itemStatusDetails;

  const itemStatusUpdate = useSelector((state) => state.itemStatusUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = itemStatusUpdate;

  const itemStatusCreate = useSelector((state) => state.itemStatusCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = itemStatusCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: ITEMSTATUS_CREATE_RESET });
      }, 2000);
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/itemStatuslist");
    }

    if (
      itemStatusId &&
      (!itemStatus || itemStatus._id !== itemStatusId || successUpdate)
    ) {
      dispatch(detailsItemStatus(itemStatusId));
    } else if (!itemStatusId) {
      dispatch({ type: ITEMSTATUS_UPDATE_RESET });
    } else {
      setInitialValues({
        name: itemStatus ? itemStatus.name : "",
        description: itemStatus ? itemStatus.description : "",
        reference: itemStatus ? itemStatus.reference : "",
      });
    }
  }, [itemStatus, dispatch, itemStatusId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!itemStatusId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createItemStatus({ ...values }));
  };

  const updateHandler = (values) => {
    dispatch(
      updateItemStatus({
        _id: itemStatusId,
        ...values,
      })
    );
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
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
                      {!itemStatusId
                        ? "Add itemStatus"
                        : "Update itemStatus : "}
                    </Typography>
                  </Grid>

                  <ActionStatus
                    loading={loading && itemStatusId}
                    error={error}
                  />
                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"itemStatus Created Successfuly"}
                  />
                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"itemStatus Updated Successfuly"}
                  />

                  <GridContainer title={"itemStatus Details"}>
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
                        name="reference"
                        label="Reference"
                        required={true}
                        type={"reference"}
                        min={1}
                      />
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>
                        {!itemStatusId ? "Add itemStatus" : "Update itemStatus"}
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
