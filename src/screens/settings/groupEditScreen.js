import React, { useEffect, useState } from "react";
// import "./Group.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";

import {
  detailsGroup,
  updateGroup,
  createGroup,
} from "../../redux/actions/groupActions";
import {
  GROUP_CREATE_RESET,
  GROUP_UPDATE_RESET,
} from "../../redux/constants/groupConstants";
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
import { listTeams } from "../../redux/actions/teamActions";
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
  team: Yup.object().required("Please Select Team"),
});

export default function GroupEditScreen(props) {
  const groupId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [open, setOpen] = React.useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    team: "",
  });

  const classes = useStyles();

  const teamList = useSelector((state) => state.teamList);
  const { loading: loadingTeam, error: errorTeam, teams } = teamList;

  const groupDetails = useSelector((state) => state.groupDetails);
  const { loading, error, group } = groupDetails;

  const groupUpdate = useSelector((state) => state.groupUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = groupUpdate;

  const groupCreate = useSelector((state) => state.groupCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = groupCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: GROUP_CREATE_RESET });
      }, 2000);
    }

    dispatch(listTeams({ name: "", pageNumber: 1, pageSize: 15 }));
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/grouplist");
    }

    if (groupId && (!group || group._id !== groupId || successUpdate)) {
      dispatch(detailsGroup(groupId));
    } else if (!groupId) {
      dispatch({ type: GROUP_UPDATE_RESET });
    } else {
      setInitialValues({
        name: group ? group.name : "",
        description: group ? group.description : "",
        team: group ? group.team : "",
      });
    }
  }, [group, dispatch, groupId, successUpdate, props.history]);

  const submitHandler = (values, { resetForm }) => {
    if (!groupId) {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    dispatch(createGroup({ ...values }));
  };

  const refrechAll = (setFieldValue, resetForm) => {
    resetForm();
  };

  const updateHandler = (values) => {
    dispatch(
      updateGroup({
        _id: groupId,
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
                      {!groupId ? "Add Group" : "Update Group : "}
                    </Typography>
                  </Grid>

                  <ActionStatus loading={loading && groupId} error={error} />
                  <ActionStatus
                    loading={loadingCreate}
                    error={errorCreate}
                    success={successCreate}
                    message={"Group Created Successfuly"}
                  />
                  <ActionStatus
                    loading={loadingUpdate}
                    error={errorUpdate}
                    success={successUpdate}
                    message={"Group Updated Successfuly"}
                  />

                  <GridContainer title={"Group Details"}>
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
                  </GridContainer>

                  <GridContainer>
                    <Grid item xs={10}>
                      <Button>{!groupId ? "Add Group" : "Update Group"}</Button>
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
