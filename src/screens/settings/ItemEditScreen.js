import React, { useEffect, useState } from "react";
// import "./Item.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsItem,
  updateItem,
  createItem,
} from "../../redux/actions/itemActions";
import {
  ITEM_CREATE_RESET,
  ITEM_UPDATE_RESET,
} from "../../redux/constants/itemConstants";
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
import { listItemStatuss } from "../../redux/actions/itemStatusActions";
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
  itemStatus: Yup.array().required("Please Select Item Status"),
});

export default function ItemEditScreen(props) {
  const itemId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    itemStatus: "",
  });

  const classes = useStyles();

  const itemStatusList = useSelector((state) => state.itemStatusList);
  const {
    loading: loadingItemStatus,
    error: errorItemStatus,
    itemStatuss,
  } = itemStatusList;

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = itemUpdate;

  const itemCreate = useSelector((state) => state.itemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = itemCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: ITEM_CREATE_RESET });
      }, 2000);
    }

    dispatch(listItemStatuss({ name: "", pageNumber: 1, pageSize: 15 }));
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/itemlist");
    }

    if (itemId && (!item || item._id !== itemId || successUpdate)) {
      dispatch(detailsItem(itemId));
    } else if (!itemId) {
      dispatch({ type: ITEM_UPDATE_RESET });
    } else {
      setInitialValues({
        name: item ? item.name : "",
        description: item ? item.description : "",
        itemStatus: item ? item.itemStatus : "",
      });
    }
  }, [item, dispatch, itemId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!itemId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createItem({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values) => {
    dispatch(
      updateItem({
        _id: itemId,
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
                      {!itemId ? "Add Item" : "Update Item : "}
                    </Typography>
                  </Grid>

                  <ActionStatus loading={loading && itemId} error={error} />
                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Item Created Successfuly"}
                  />
                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"Item Updated Successfuly"}
                  />

                  <GridContainer title={"Item Details"}>
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
                            handleInputChange(e, listItemStatuss);
                          }}
                          options={itemStatuss}
                          required={true}
                          isMulti={true}
                          isSearchable
                          name="itemStatus"
                          loading={loadingItemStatus}
                          error={errorItemStatus}
                          label={"Item Status"}
                        />
                      </div>
                    </Grid>
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>{!itemId ? "Add Item" : "Update Item"}</Button>
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
