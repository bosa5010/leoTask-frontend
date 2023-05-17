import React, { useEffect, useState, useRef } from "react";
import "./task.css";
import "./task.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "../../components/FormsUI/button/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { listWeeks } from "../../redux/actions/weekActions";
import { detailsTask, updateTask } from "../../redux/actions/taskActions";
import {
  SUBTASK_CREATE_RESET,
  SUBTASK_UPDATE_RESET,
  SUBTASK_DELETE_RESET,
} from "../../redux/constants/subTaskConstants";
import { TASK_UPDATE_RESET } from "../../redux/constants/taskConstants";
import GridContainer from "../../components/GridContainer";
import AppDialog from "../../components/FormsUI/dialog/FormDialog";
import FormButton from "../../components/FormsUI/button/FormButton";
import moment from "../../../node_modules/moment/moment";
import { Container, Grid } from "../../../node_modules/@material-ui/core/index";
import ReactSelectForm from "../../components/FormsUI/ReactSelect/ReactSelectForm";
import AppDateTimePickerForm from "../../components/FormsUI/AppDateTimePickerFrom/AppDateTimePickerForm";
import TextAreaForm from "../../components/FormsUI/TextArea/TextAreaForm";
import { listUsers } from "../../redux/actions/userActions";
import { listStatuss } from "../../redux/actions/statusActions";
import AppInputForm from "../../components/FormsUI/AppInputFrom/AppInputForm";
import AppFormButton from "../../components/FormsUI/button/AppFormButton";
import { MdOutlineUpdate } from "react-icons/md";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
// import StatusList from "../../components/StatusList";
import {
  createSubTask,
  deleteSubTask,
  listSubTasks,
  updateSubTask,
} from "../../redux/actions/subTaskActions";
import { Link } from "react-router-dom";
import { ActionStatus } from "../../components/ActionStatus";
import TabsList from "../../components/TabsList";
import LinkFormButton from "../../components/FormsUI/button/LinkFormButton";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(10),
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
  currentStep: Yup.object().required("Please Choose Current Step"),
  item: Yup.object().required(),
  itemStatus: Yup.object().required(),
  itemNumber: Yup.number().min(1).required(),
  itemComment: Yup.string().required(),
});

export default function SubTaskEditScreen(props) {
  const taskId =
    props.match && props.match.params.id !== "null"
      ? props.match.params.id
      : null;

  const [initialValues, setInitialValues] = useState({
    description: "",
    reference: "",
    referenceNumber: 1,
    taskModel: "",
    currentStep: "",
    system: "",
    instance: "",
    startWeek: "",
    endWeek: "",
    startDate: "",
    endDate: "",
    salePrice: "",
    closedDate: "",
    dedline: "",
    createdBy: "",
    responsibleUser: "",
    responsibleUsers: "",
    status: "",
    item: "",
    itemStatus: "",
    itemComment: "",
    itemNumber: 1,
    itemID: "",
    comment: "",
  });

  const [open, setOpen] = React.useState(Boolean(false));
  const [deleteOpen, SetDeleteOpen] = React.useState(false);

  const [selectedItems, setSelectedItems] = useState("");
  const [selectedSubTask, setSelectedSubTask] = useState("");
  const [selectedItemStatus, setSelectedItemStatus] = useState("");
  const [selectedِCurrentStep, setSelectedِCurrentStep] = useState("");
  const [steps, setSteps] = useState("");
  const [selectedStep, setSelectedStep] = useState("");
  const [reference, setReference] = useState("");
  const [endWeek, setEndWeek] = useState("");
  const [value, setValue] = React.useState(0);
  const [statusValue, setStatusValue] = React.useState(0);

  const [editSubTask, setEditSubTask] = useState("ADD SUBTASK");

  const classes = useStyles();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const weekList = useSelector((state) => state.weekList);
  const { loading: loadingWeek, error: errorWeek, weeks } = weekList;

  const userList = useSelector((state) => state.userList);
  const { error: errorUser, users } = userList;

  const statusList = useSelector((state) => state.statusList);
  const { error: errorStatus, status } = statusList;

  const subTaskList = useSelector((state) => state.subTaskList);
  const {
    loading: loadingSubtask,
    error: errorSubtask,
    pages,
    pageNumber,
    pageSize,
    subTasks,
  } = subTaskList;

  const subTaskCreate = useSelector((state) => state.subTaskCreate);
  const {
    loading: loadingSubTaskCreate,
    error: errorSubTaskCreate,
    success: successSubTaskCreate,
  } = subTaskCreate;

  const subTaskUpdate = useSelector((state) => state.subTaskUpdate);
  const {
    loading: loadingSubTaskUpdate,
    error: errorSubTaskUpdate,
    success: successSubTaskUpdate,
  } = subTaskUpdate;

  const subTaskDelete = useSelector((state) => state.subTaskDelete);
  const {
    loading: loadingSubTaskDelete,
    error: errorSubTaskDelete,
    success: successSubTaskDelete,
  } = subTaskDelete;

  const taskDetails = useSelector((state) => state.taskDetails);
  const { loading: loadingTask, error: errorTask, task } = taskDetails;

  const taskUpdate = useSelector((state) => state.taskUpdate);
  const {
    loading: loadingTaskUpdate,
    error: errorTaskUpdate,
    success: successTaskUpdate,
  } = taskUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers({}));

    dispatch(listStatuss({}));

    if (taskId) {
      dispatch(listSubTasks({ task: taskId, pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (successSubTaskCreate) {
      setTimeout(function () {
        dispatch({ type: SUBTASK_CREATE_RESET });
        if (taskId) {
          dispatch(listSubTasks({ task: taskId, pageNumber: 1, pageSize: 15 }));
        }
      }, 2000);
    }
  }, [dispatch, successSubTaskCreate, taskId]);

  useEffect(() => {
    if (successSubTaskUpdate) {
      setTimeout(function () {
        dispatch({ type: SUBTASK_UPDATE_RESET });
        if (taskId) {
          dispatch(listSubTasks({ task: taskId, pageNumber: 1, pageSize: 15 }));
        }
      }, 2000);
    }
  }, [dispatch, successSubTaskUpdate, taskId]);

  useEffect(() => {
    if (successSubTaskDelete) {
      setTimeout(function () {
        dispatch({ type: SUBTASK_DELETE_RESET });
        if (taskId) {
          dispatch(listSubTasks({ task: taskId, pageNumber: 1, pageSize: 15 }));
        }
      }, 2000);
    }
  }, [dispatch, successSubTaskDelete, taskId]);

  useEffect(() => {
    if (successTaskUpdate) {
      setTimeout(function () {
        dispatch({ type: TASK_UPDATE_RESET });
        if (taskId) {
          dispatch(detailsTask(taskId));
          dispatch(listSubTasks({ task: taskId, pageNumber: 1, pageSize: 15 }));
        }
      }, 2000);
    }
  }, [dispatch, successTaskUpdate, taskId]);

  useEffect(() => {
    if (taskId && (!task || task._id !== taskId)) {
      dispatch(detailsTask(taskId));
    }
    if (task) {
      setInitialValues({
        description:
          task?.status?.number < 3
            ? task?.taskModel?.description
            : task?.description || "",
        shortDescription: task?.shortDescription || "",
        reference: task?.reference || "",
        taskModel: task?.taskModel || "",
        currentStep: task?.currentStep || "",
        system: task?.system || "",
        instance: task?.instance || "",
        startDate: task?.startDate || "",
        startWeek: task?.startWeek || "",
        endDate: task?.endDate || "",
        endWeek: task?.endWeek || "",
        closedDate: task?.closedDate || "",
        dedline: task?.dedline || "",
        responsibleUser: task?.responsibleUser || "",
        responsibleUsers: task?.responsibleUsers || "",
        status: task?.status || "",
        item: "",
        itemStatus: "",
        itemComment: "",
        itemNumber: 1,
      });
      setSelectedItems(task.currentStep.items);
      setSelectedItemStatus(task.currentStep.items[0].itemStatus);
      setSelectedِCurrentStep(task.currentStep);
      setReference(task.reference);
      setSteps(task.taskModel.steps.sort(compare));
      setEndWeek(task.endWeek);

      dispatch(
        listWeeks({
          name: "",
          pageNumber: 1,
          pageSize: 15,
          firstDate: task && task.startWeek ? task.startWeek.endDate : "",
        })
      );
    }
  }, [task, dispatch, taskId]);

  function compare(a, b) {
    if (a.number < b.number) {
      return -1;
    }
    if (a.number > b.number) {
      return 1;
    }
    return 0;
  }

  const submitHandler = (values, { resetForm }) => {
    if (editSubTask === "ADD SUBTASK") {
      createHandler(values);
    } else {
      updateHandler(values);
    }
    resetForm();
  };

  const createHandler = (values) => {
    if (values["status"].number === 2) {
      dispatch(createSubTask({ task: taskId, ...values }));
    }
  };

  const updateHandler = (values) => {
    if (values["status"].number === 2) {
      dispatch(updateSubTask(values));
      setEditSubTask("ADD SUBTASK");
    }
  };

  const myRef = useRef();

  const updateSubtask = (values, label, setFieldValue, resetForm, item) => {
    if (
      task.status.number === 2 &&
      task.responsibleUser &&
      task.responsibleUser._id === userInfo._id
    ) {
      window.scrollTo({ behavior: "smooth", top: myRef.current.offsetTop });

      setEditSubTask("UPDATE SUBTASK");
      setFieldValue("currentStep", item.taskStep);
      setFieldValue("item", item.item);
      setFieldValue("itemStatus", item.itemStatus);
      setFieldValue("itemNumber", item.itemNumber);
      setFieldValue("itemComment", item.itemComment);
      setFieldValue("itemID", item._id);
    }
  };

  const deleteHandler = (values) => {
    if (
      task.status.number === 2 &&
      task.responsibleUser &&
      task.responsibleUser._id === userInfo._id
    ) {
      SetDeleteOpen(values.itemID ? true : false);
      setSelectedSubTask(values.itemID);
    }
  };

  const deleteSubTaskHandler = (setFieldValue, resetForm, values) => {
    if (
      task.status.number === 2 &&
      task.responsibleUser &&
      task.responsibleUser._id === userInfo._id
    ) {
      dispatch(deleteSubTask(selectedSubTask));
      resetForm();
      setEditSubTask("ADD SUBTASK");
      SetDeleteOpen(false);
      setSelectedSubTask("");
    }
  };

  const assignToMeHandler = (values, label) => {
    if (status && userInfo && task.status.number <= 2) {
      const tempStatus = status.find((element) => element.number === 2);
      const tempUser = task.responsibleUser
        ? task.responsibleUser.name
        : "Empty";

      var comment;
      comment =
        "Status " +
        tempStatus.name +
        " was " +
        task.status.name +
        ". Responsible User " +
        userInfo.name +
        " was " +
        tempUser +
        ".";

      dispatch(
        updateTask({
          _id: taskId,
          ...values,
          comment: comment,
          responsibleUser: userInfo._id,
          status: tempStatus._id,
        })
      );
    }
  };

  const nextStepHandler = (values, label) => {
    if (
      task.responsibleUser &&
      task.responsibleUser._id === userInfo._id &&
      task.status.number === 2 &&
      editSubTask !== "UPDATE SUBTASK" &&
      task &&
      task.taskModel.steps &&
      task.currentStep.number <
        task.taskModel.steps[task.taskModel.steps.length - 1].number
    ) {
      const index = task.taskModel.steps.findIndex((object) => {
        return object._id === task.currentStep._id;
      });

      const tempStep = task.taskModel.steps[index + 1];

      var comment;
      comment =
        "Current Step " + tempStep.name + " was " + task.currentStep.name;

      dispatch(
        updateTask({
          _id: taskId,
          ...values,
          comment,
          createdBy: userInfo._id,
          currentStep: tempStep._id,
        })
      );

      if (
        values["item"] &&
        values["itemStatus"] &&
        values["itemComment"] &&
        values["itemNumber"]
      ) {
        createHandler(values);
      }
    }
  };

  const previousStepHandler = (values, label) => {
    if (
      task.responsibleUser &&
      task.responsibleUser._id === userInfo._id &&
      task.status.number === 2 &&
      editSubTask !== "UPDATE SUBTASK" &&
      task &&
      task.taskModel.steps &&
      task.currentStep.number > task.taskModel.steps[0].number
    ) {
      const index = task.taskModel.steps.findIndex((object) => {
        return object._id === task.currentStep._id;
      });

      const tempStep = task.taskModel.steps[index - 1];

      var comment;
      comment =
        "Current Step " + tempStep.name + " was " + task.currentStep.name;

      dispatch(
        updateTask({
          _id: taskId,
          ...values,
          comment,
          createdBy: userInfo._id,
          currentStep: tempStep._id,
        })
      );
      if (
        values["item"] &&
        values["itemStatus"] &&
        values["itemComment"] &&
        values["itemNumber"]
      ) {
        createHandler(values);
      }
    }
  };

  const saveHandler = (values) => {
    if (
      task.status.number <= 2 &&
      (!task.responsibleUser?._id || task.responsibleUser?._id === userInfo._id)
    ) {
      const date = values.status.number > 2 ? new Date() : values.closedDate;
      var comment;
      var commentStatus =
        values.status.name !== task.status.name
          ? "Status " + values.status.name + " was " + task.status.name + ". "
          : "";

      var commentDate =
        values.endWeek?.name !== task.endWeek?.name
          ? "EndWeek " + values.endWeek?.name + " was " + task.endWeek?.name
          : "";

      const tempUser = task.responsibleUser
        ? task.responsibleUser?.name
        : "Empty";

      var commentUser =
        task.responsibleUser?._id !== values.responsibleUser?._id
          ? "Status " +
            values.status.name +
            " was " +
            task.status.name +
            ". Responsible User " +
            values.responsibleUser.name +
            " was " +
            tempUser +
            ". "
          : "";

      comment = commentUser
        ? commentUser + commentDate
        : commentStatus + commentDate;

      dispatch(
        updateTask({
          _id: taskId,
          ...values,
          comment,
          closedDate: date,
        })
      );
    }
  };

  const closeHandler = (values) => {
    if (
      task.responsibleUser &&
      task.responsibleUser._id === userInfo._id &&
      taskId &&
      status &&
      task &&
      task.status.number === 2
    ) {
      const tempStatus = status.find((element) => element.number === 6);
      var comment;
      comment = "Status " + tempStatus.name + " was " + task.status.name;

      dispatch(
        updateTask({
          _id: taskId,
          ...values,
          comment: comment,
          closedDate: new Date(),
          status: tempStatus._id,
        })
      );
    }
  };

  const refrechAll = (setFieldValue, resetForm) => {
    setEditSubTask("ADD SUBTASK");
    resetForm();
  };

  const handleInputChange = (e, list) => {
    e !== ""
      ? dispatch(
          list({
            name: e,
            pageNumber: 1,
            pageSize: 15,
          })
        )
      : dispatch(
          list({
            pageNumber: 1,
            pageSize: 15,
          })
        );
  };

  const onChangeItem = (setFieldValue, values, value, object) => {
    setFieldValue("itemStatus", "");
    setFieldValue("itemComment", "");
    setFieldValue("itemNumber", 1);

    setSelectedItemStatus(value.itemStatus);
  };

  const onChangeItemStatus = (setFieldValue, values, value, object) => {
    if (values.item && value && values.itemNumber) {
      const comment =
        values.itemNumber + " " + values.item.name + " " + value.name;

      setFieldValue("itemComment", comment);
    }
  };

  const onChangeItemNumber = (setFieldValue, values, value, object) => {
    if (values.item && values.itemStatus) {
      const comment =
        value + " " + values.item.name + " " + values.itemStatus.name;
      setFieldValue("itemComment", comment);
    }
  };

  const onChangeResponsibleUser = (setFieldValue, values, value, object) => {
    if (values["responsibleUser"] && status) {
      const tempStatus = status.find((element) => element.number === 1);

      setFieldValue("status", tempStatus);
    }
  };

  const onChangeEndWeek = (setFieldValue, values, value, object) => {
    setEndWeek(object);
    setFieldValue("endDate", object.endDate);
    setFieldValue("closedDate", object.endDate);
    setFieldValue("dedline", object.endDate);
  };

  const handleInputChangeEndDate = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 15,
          firstDate: task && task.startWeek ? task.startWeek.endDate : "",
          lastDate: "",
        })
      );
  };

  const onChangeStartDate = (setFieldValue, values, value, object) => {
    if (
      task.responsibleUser &&
      task.responsibleUser._id === userInfo._id &&
      values["endDate"] &&
      values["endDate"] < value
    ) {
      setFieldValue("startDate", values["endDate"]);
    }
  };

  const onChangeStep = (setFieldValue, values, value, object) => {
    setFieldValue("item", "");
    setFieldValue("itemStatus", "");
    setFieldValue("description", value.description);
    setSelectedItems(value.items);
    setSelectedItemStatus(value.items.itemStatus);
  };

  const selectStepHandler = (step) => {
    setSelectedStep(step?._id);
    dispatch(
      listSubTasks({
        task: taskId,
        taskStep: step?._id,
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  const resetStepHandler = (values, label) => {
    const index = task.taskModel.steps.findIndex((object) => {
      return object._id === task.currentStep._id;
    });
    setSelectedStep("");
    setValue(index);
    dispatch(
      listSubTasks({
        task: taskId,
        taskStep: "",
        pageNumber: 1,
        pageSize: 15,
      })
    );
  };

  return (
    <Grid container>
      <ActionStatus loading={loadingTask} error={errorTask} />

      <ActionStatus
        loading={loadingTaskUpdate}
        error={errorTaskUpdate}
        success={successTaskUpdate}
        message={"Task Updated Successfully"}
      />
      <Grid item xs={12}>
        <Container maxWidth="lg">
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
                  {/* <GridContainer>
                    <Grid item xs={12} className={classes.formField}>
                      <StatusList
                        steps={status}
                        currentStep={task?.status}
                      ></StatusList>
                    </Grid>
                  </GridContainer> */}

                  <GridContainer>
                    <Grid item xs={12} className={classes.formField}>
                      <TabsList
                        steps={status}
                        currentStep={task?.status}
                        selectStepHandler={selectStepHandler}
                        value={statusValue}
                        setValue={setStatusValue}
                      />
                    </Grid>
                  </GridContainer>

                  <GridContainer
                    title={"Task : " + reference}
                    headerButton={
                      <div className="row">
                        <AppFormButton label="Save" onPress={saveHandler} />
                        <AppFormButton
                          label="Assign to me"
                          onPress={assignToMeHandler}
                        />

                        <AppFormButton label="Close" onPress={closeHandler} />
                      </div>
                    }
                  >
                    <Grid item xs={6} className={classes.formField}>
                      <Grid item xs={10} className={classes.formField}>
                        <div>
                          <ReactSelectForm
                            isDisabled={true}
                            options={task && [task.taskModel]}
                            isMulti={false}
                            isSearchable
                            name="taskModel"
                            loading={loadingTask}
                            error={errorTask}
                            label={"Task Model"}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={10} className={classes.formField}>
                        <div>
                          <ReactSelectForm
                            closeMenuOnSelect={true}
                            isDisabled={true}
                            options={[task && task.systems]}
                            isMulti={false}
                            isSearchable
                            name="system"
                            loading={loadingTask}
                            error={errorTask}
                            label={"System"}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={10} className={classes.formField}>
                        <div>
                          <ReactSelectForm
                            options={task && [task.instances]}
                            isMulti={false}
                            isSearchable
                            isDisabled={true}
                            name="instance"
                            loading={loadingTask}
                            error={errorTask}
                            label={"Instance"}
                          />
                        </div>
                      </Grid>

                      <div className="row justifyContent">
                        <Grid item xs={6}>
                          <AppDateTimePickerForm
                            disabled={true}
                            label={"Start Date"}
                            name={"startDate"}
                            required={true}
                            instruction={onChangeStartDate}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <AppDateTimePickerForm
                            disabled={true}
                            label={"End Date"}
                            name={"endDate"}
                            required={true}
                            instruction={onChangeStartDate}
                          />
                        </Grid>
                      </div>
                    </Grid>

                    <Grid item xs={6} className={classes.formField}>
                      <Grid item xs={10} className={classes.formField}>
                        <div>
                          <ReactSelectForm
                            options={status}
                            isMulti={false}
                            required={true}
                            onInputChange={(e) => {
                              handleInputChange(e, listStatuss);
                            }}
                            isDisabled={task && task.status.number > 3}
                            isSearchable
                            name="status"
                            error={errorStatus}
                            label={"Status"}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={10} className={classes.formField}>
                        <div>
                          <ReactSelectForm
                            closeMenuOnSelect={true}
                            instruction={onChangeResponsibleUser}
                            required={true}
                            isDisabled={task && task.status.number > 3}
                            onInputChange={(e) => {
                              handleInputChange(e, listUsers);
                            }}
                            options={users && users}
                            isMulti={false}
                            isSearchable
                            name="responsibleUser"
                            // loading={loadingUser}
                            error={errorUser}
                            label={"Responsible User"}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={10} className={classes.formField}>
                        <div>
                          <ReactSelectForm
                            closeMenuOnSelect={true}
                            instruction={onChangeEndWeek}
                            isDisabled={
                              task &&
                              task.status.number !== 2 &&
                              task.responsibleUser &&
                              task.responsibleUser._id !== userInfo._id
                            }
                            onInputChange={(e) => {
                              handleInputChangeEndDate(e, listWeeks);
                            }}
                            options={weeks && weeks}
                            required={true}
                            isMulti={false}
                            isSearchable
                            name="endWeek"
                            loading={loadingWeek}
                            error={errorWeek}
                            label={"End Week"}
                          />
                        </div>
                      </Grid>
                      <div className="row justifyContent">
                        <Grid item xs={6}>
                          <AppDateTimePickerForm
                            minDate={moment(task && task.startDate).format(
                              "DD-MM-yyyy"
                            )}
                            maxDate={moment(endWeek && endWeek.endDate).format(
                              "DD-MM-yyyy"
                            )}
                            label={"Close Date"}
                            name={"closedDate"}
                            required={true}
                            disabled={true}
                            instruction={onChangeStartDate}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <AppDateTimePickerForm
                            minDate={moment(task && task.startDate).format(
                              "DD-MM-yyyy"
                            )}
                            maxDate={moment(endWeek && endWeek.endDate).format(
                              "DD-MM-yyyy"
                            )}
                            label={"Dedline"}
                            name={"dedline"}
                            required={true}
                            instruction={onChangeStartDate}
                          />
                        </Grid>
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <TextAreaForm
                        aria-label="empty textarea"
                        label="Short Description"
                        placeholder="Short Description ..."
                        minRows={1}
                        maxRows={5}
                        required={true}
                        name={"shortDescription"}
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextAreaForm
                        aria-label="empty textarea"
                        label="Description"
                        placeholder="Description ..."
                        minRows={5}
                        maxRows={40}
                        required={true}
                        name={"description"}
                        disabled
                      />
                    </Grid>
                  </GridContainer>

                  <GridContainer
                    title={"Steps"}
                    headerButton={
                      <div className="row">
                        <LinkFormButton
                          label="Reset Steps"
                          onPress={resetStepHandler}
                        />
                      </div>
                    }
                  >
                    <div ref={myRef} />
                    <Grid item xs={12} className={classes.formField}>
                      <TabsList
                        steps={steps}
                        currentStep={selectedِCurrentStep}
                        selectStepHandler={selectStepHandler}
                        value={value}
                        setValue={setValue}
                      />
                    </Grid>
                  </GridContainer>

                  <GridContainer
                    title={"Feedback"}
                    headerButton={
                      editSubTask === "ADD SUBTASK" ? (
                        <div className="row">
                          <AppFormButton
                            label="Previous Step"
                            onPress={previousStepHandler}
                            leftIcon={<BiLeftArrow />}
                            // disabled={
                            //   task &&
                            //   task.steps &&
                            //   task.currentStep === task.steps[task.steps.length]
                            // }
                          />
                          <AppFormButton
                            label="Next Step"
                            onPress={nextStepHandler}
                            rightIcon={<BiRightArrow />}
                          />
                        </div>
                      ) : (
                        <AppFormButton
                          label="Delete"
                          onPress={deleteHandler}
                          rightIcon={
                            <AiFillDelete
                              style={{ color: "white", fontSize: "100%" }}
                            />
                          }
                        />
                      )
                    }
                  >
                    <Grid item xs={3} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          instruction={onChangeStep}
                          options={steps && steps}
                          isDisabled={false}
                          required={true}
                          isMulti={false}
                          isSearchable
                          name="currentStep"
                          loading={loadingTask}
                          error={errorTask}
                          label={"Current Step"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={3} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          instruction={onChangeItem}
                          options={selectedItems && selectedItems}
                          isMulti={false}
                          isSearchable
                          name="item"
                          loading={loadingTask}
                          error={errorTask}
                          label={"Item"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={3} className={classes.formField}>
                      <div>
                        <ReactSelectForm
                          closeMenuOnSelect={true}
                          options={selectedItemStatus && selectedItemStatus}
                          isMulti={false}
                          instruction={onChangeItemStatus}
                          isSearchable
                          name="itemStatus"
                          loading={loadingTask}
                          error={errorTask}
                          label={"Item Status"}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <AppInputForm
                        instruction={onChangeItemNumber}
                        name="itemNumber"
                        label="Number"
                        min={1}
                        required={true}
                        type={"number"}
                      ></AppInputForm>
                    </Grid>

                    <Grid item xs={12}>
                      <TextAreaForm
                        aria-label="empty textarea"
                        placeholder="Comment ..."
                        minRows={5}
                        maxRows={10}
                        name={"itemComment"}
                        label="Comment"
                        required={true}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <Button disabled={task && task.status.number !== 2}>
                        {editSubTask}
                      </Button>
                    </Grid>

                    <Grid item xs={2}>
                      <FormButton
                        onPress={() => setOpen(Boolean(true))}
                        disabled={task && task.status.number !== 2}
                      >
                        Referech
                      </FormButton>
                    </Grid>
                  </GridContainer>

                  <ActionStatus loading={loadingSubtask} error={errorSubtask} />

                  <ActionStatus
                    loading={loadingSubTaskCreate}
                    error={errorSubTaskCreate}
                    success={successSubTaskCreate}
                    message={"SubTask Added Successfully"}
                  />

                  <ActionStatus
                    loading={loadingSubTaskUpdate}
                    error={errorSubTaskUpdate}
                    success={successSubTaskUpdate}
                    message={"SubTask Updated Successfully"}
                  />

                  <ActionStatus
                    loading={loadingSubTaskDelete}
                    error={errorSubTaskDelete}
                    success={successSubTaskDelete}
                    message={"SubTask Deleted Successfully"}
                  />
                  <p>Activities : {pages}</p>

                  {subTasks &&
                    subTasks.length > 0 &&
                    subTasks.map((subTask, index) => (
                      <GridContainer key={index}>
                        <Grid item xs={12}>
                          <div>
                            <div className="row">
                              <div className="row">
                                <div className="createdBy">
                                  <div>
                                    {subTask.createdBy.lastName.charAt(0) +
                                      subTask.createdBy.firstName.charAt(0)}
                                  </div>
                                </div>
                                <div className="name">
                                  {subTask.createdBy.name}
                                </div>
                              </div>
                              <div className="row">
                                <div className="createdAt">
                                  {moment(subTask.createdAt).format(
                                    "ddd DD-MM-yyyy hh:mm:ss"
                                  )}
                                </div>
                                {subTask.taskStep !== null && (
                                  <div className="row">
                                    <AppFormButton
                                      onPress={updateSubtask}
                                      item={subTask}
                                      rightIcon={
                                        <MdOutlineUpdate
                                          className={"updateIcon"}
                                        />
                                      }
                                    />
                                    <AppFormButton
                                      style={{
                                        color: "white",
                                        fontSize: "2.5rem",
                                      }}
                                      onPress={() => {
                                        SetDeleteOpen(
                                          subTask._id ? true : false
                                        );
                                        setSelectedSubTask(subTask._id);
                                      }}
                                      rightIcon={<AiFillDelete />}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                            {subTask.taskStep ? (
                              <div className="itemDtails">
                                <div>
                                  {"Task Step : " + subTask.taskStep.name}
                                </div>
                                <div>{"Item : " + subTask.item.name}</div>
                                <div>
                                  {"Status : " + subTask.itemStatus.name}
                                </div>
                                <div>{"Number : " + subTask.itemNumber}</div>
                                {subTask &&
                                  subTask.updatedBy &&
                                  subTask.updatedAt !== subTask.createdAt && (
                                    <div>
                                      {"Update By : " + subTask.updatedBy.name}
                                    </div>
                                  )}
                                {subTask &&
                                  subTask.updatedAt !== subTask.createdAt && (
                                    <div className="updatedAt">
                                      {" Updated At  : " +
                                        moment(subTask.updatedAt).format(
                                          "ddd DD-MM-yyyy hh:mm:ss"
                                        )}
                                    </div>
                                  )}
                                <p>{"Comment : " + subTask.itemComment}</p>
                              </div>
                            ) : (
                              <div className="itemDtails">
                                <p>{"Comment : " + subTask.itemComment}</p>
                              </div>
                            )}
                          </div>
                        </Grid>
                      </GridContainer>
                    ))}

                  {pages && pageSize && pageNumber && (
                    <div className="row center pagination">
                      {[...Array(Math.ceil(pages / pageSize)).keys()].map(
                        (x) => (
                          <Link
                            className={x + 1 === pageNumber ? "active" : ""}
                            key={x + 1}
                            to={`/subtask/${taskId}/edit`}
                            onClick={() => {
                              window.scrollTo({
                                behavior: "smooth",
                                top: myRef.current.offsetTop,
                              });

                              dispatch(
                                listSubTasks({
                                  task: taskId,
                                  taskStep: selectedStep,
                                  pageNumber: x + 1,
                                  pageSize,
                                })
                              );
                            }}
                          >
                            {x + 1}
                          </Link>
                        )
                      )}
                    </div>
                  )}

                  <AppDialog
                    message={"Do you want to refresh the page ?    "}
                    title={"Refresh ?"}
                    agree={"Refresh"}
                    onClose={refrechAll}
                    open={open}
                    setOpen={setOpen}
                  />

                  <AppDialog
                    message={"Do you want to Delete this Item ?    "}
                    title={"Delete ?"}
                    agree={"Delete"}
                    onClose={deleteSubTaskHandler}
                    open={deleteOpen}
                    setOpen={SetDeleteOpen}
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
