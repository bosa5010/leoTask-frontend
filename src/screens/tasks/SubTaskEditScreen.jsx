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
import { objectId } from "../../utils";
import * as XLSX from "xlsx";
import AppModal from "../../components/modal/AppModal";

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
    responsibleGroup: "",
    responsibleGroups: "",
    responsibleTeam: "",
    responsibleTeams: "",
    status: "",
    item: "",
    itemStatus: "",
    itemComment: "",
    itemNumber: 1,
    itemID: "",
    comment: "",
    uploadData: "",
    data: [],
    steps: [],
  });

  const [open, setOpen] = React.useState(Boolean(false));
  const [openModel, setOpenModel] = React.useState(Boolean(false));

  const [deleteOpen, SetDeleteOpen] = React.useState(false);

  const [selectedItems, setSelectedItems] = useState("");
  const [selectedSubTask, setSelectedSubTask] = useState("");
  const [selectedItemStatus, setSelectedItemStatus] = useState("");
  const [selectedِCurrentStep, setSelectedِCurrentStep] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [steps, setSteps] = useState("");
  const [selectedStep, setSelectedStep] = useState("");
  const [reference, setReference] = useState("");
  const [endWeek, setEndWeek] = useState("");
  const [value, setValue] = React.useState(0);
  const [statusValue, setStatusValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [confirmData, setConfirmData] = useState(false);

  const [editSubTask, setEditSubTask] = useState("ADD SUBTASK");

  const classes = useStyles();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const weekList = useSelector((state) => state.weekList);
  const { loading: loadingWeek, error: errorWeek, weeks } = weekList;

  const userList = useSelector((state) => state.userList);
  const { error: errorUser, loading: loadingUser, users } = userList;

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
    message: messageSubTaskCreate,
    subTask,
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

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: "binary",
      });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      setOpenModel(true);
    };
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listStatuss({}));

    if (taskId) {
      dispatch(listSubTasks({ task: taskId, pageNumber: 1, pageSize: 15 }));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    dispatch(
      listUsers({
        groups: selectedGroup?._id || [],
      })
    );
  }, [dispatch, selectedGroup]);

  useEffect(() => {
    if (successSubTaskCreate) {
      setTimeout(function () {
        dispatch({ type: SUBTASK_CREATE_RESET });
        if (taskId) {
          if (taskId && subTask?.length > 1) {
            dispatch(detailsTask(taskId));
          }
          dispatch(listSubTasks({ task: taskId, pageNumber: 1, pageSize: 15 }));
        }
      }, 2000);
    }
  }, [dispatch, successSubTaskCreate, taskId, subTask]);

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
        responsibleUser: task ? task.responsibleUser : "",
        responsibleUsers: task ? task.responsibleUsers : "",
        responsibleGroup: task ? task.responsibleGroup : "",
        responsibleGroups: task ? task.responsibleGroups : "",
        responsibleTeam: task ? task.responsibleTeam : "",
        responsibleTeams: task ? task.responsibleTeams : "",
        steps: task?.taskModel?.steps.sort(compare) || "",
        status: task?.status || "",
        data: "",
        uploadData: "",
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

      setSelectedGroup(task.responsibleGroup);
    }
  }, [task, dispatch, taskId]);

  useEffect(() => {
    dispatch(
      listWeeks({
        name: "",
        pageNumber: 1,
        pageSize: 15,
        firstDate: task && task.startWeek ? task.startWeek.endDate : "",
      })
    );
  }, [dispatch, task]);

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

  const selectExcelFile = (values, label, setFieldValue, resetForm, item) => {
    if (values["status"].number === 2) {
      setOpenModel(true);
      setConfirmData(false);
    }
  };

  const ConfirmUploadHandler = (
    values,
    label,
    setFieldValue,
    resetForm,
    item
  ) => {
    if (values["status"].number === 2) {
      setFieldValue("data", data);
      setOpenModel(false);
      setConfirmData(true);
    }
  };

  const uploadHandler = (setFieldValue, resetForm, values, item) => {
    if (values["status"].number === 2) {
      createHandler(values);
      setData("");
      setConfirmData(false);
    }
  };

  const CancelUploadHandler = (setFieldValue, resetForm, values, item) => {
    if (values["status"].number === 2) {
      setFieldValue("data", data);
      setConfirmData(false);

      setData("");
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
    const groupFound = userInfo?.groups.some((element) => {
      if (element._id === values["responsibleGroup"]?._id) {
        return true;
      }

      return false;
    });

    if (status && userInfo && task.status.number <= 2 && groupFound) {
      const tempStatus = status.find((element) => element.number === 2);
      const tempUser = task.responsibleUser
        ? task.responsibleUser.name
        : "Empty";

      const tempGroup = task.responsibleGroup.name;

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
        ". " +
        ". Responsible Group " +
        values["responsibleGroup"].name +
        " was " +
        tempGroup +
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

      const tempGroup = task.responsibleGroup.name;

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
            ". " +
            ". Responsible Group " +
            values["responsibleGroup"].name +
            " was " +
            tempGroup +
            "."
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

  const handleInputChangeUsers = (e, list) => {
    e !== "" &&
      dispatch(
        list({
          name: e,
          pageNumber: 1,
          pageSize: 15,
          groups: selectedGroup?._id || objectId(task?.responsibleGroups),
        })
      );
  };

  const onChangeItem = (setFieldValue, values, value, object) => {
    setFieldValue("itemStatus", "");
    setFieldValue("itemComment", "");
    setFieldValue("itemNumber", 1);

    setSelectedItemStatus(value.itemStatus);
  };

  const onChangeResponsibleGroup = (setFieldValue, values, value, object) => {
    setFieldValue("responsibleUser", "");
  };

  const onChangeItemStatus = (setFieldValue, values, value, object) => {
    if (values.item && value && values.itemNumber) {
      const comment =
        values.itemNumber + " " + values.item.name + " " + value.name;

      setFieldValue("itemComment", comment);
      setFieldValue("data", data);
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
                      <Grid item xs={10} className={classes.formField}>
                        <div>
                          <ReactSelectForm
                            closeMenuOnSelect={true}
                            isDisabled={true}
                            options={weeks && weeks}
                            required={true}
                            isMulti={false}
                            isSearchable
                            name="startWeek"
                            loading={loadingWeek}
                            error={errorWeek}
                            label={"Start Week"}
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
                            setSelectedOptions={setSelectedGroup}
                            instruction={onChangeResponsibleGroup}
                            required={true}
                            isDisabled={task && task.status.number > 3}
                            options={task?.responsibleGroups}
                            isMulti={false}
                            isSearchable
                            name="responsibleGroup"
                            // loading={loadingGroup}
                            error={errorTask}
                            label={"Responsible Group"}
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
                              handleInputChangeUsers(e, listUsers);
                            }}
                            options={users && users}
                            isMulti={false}
                            isSearchable
                            name="responsibleUser"
                            loading={loadingUser}
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
                          {data.length > 0 && !confirmData ? (
                            <AppFormButton
                              label="Confirm Upload Data"
                              onPress={ConfirmUploadHandler}
                              item={data}
                            />
                          ) : (
                            <AppFormButton
                              label="Select Excel File"
                              onPress={selectExcelFile}
                            />
                          )}

                          <AppFormButton
                            label="Previous Step"
                            onPress={previousStepHandler}
                            leftIcon={<BiLeftArrow />}
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
                    {data?.length === 0 ? (
                      <>
                        <Grid item xs={3} className={classes.formField}>
                          <div>
                            <ReactSelectForm
                              closeMenuOnSelect={true}
                              instruction={onChangeStep}
                              options={steps && steps}
                              isDisabled={true}
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
                      </>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          {confirmData && (
                            <p>
                              {data?.length + " Items Confirmed to be uploaded"}
                            </p>
                          )}
                          {!confirmData && (
                            <p>{"Please Confirm Uploading selected Itmes"}</p>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <FormButton
                            onPress={uploadHandler}
                            item={data}
                            disabled={
                              (task && task.status.number !== 2) || !confirmData
                            }
                          >
                            Upload Data
                          </FormButton>
                        </Grid>
                        <Grid item xs={6}>
                          <FormButton
                            onPress={CancelUploadHandler}
                            item={data}
                            disabled={task && task.status.number !== 2}
                          >
                            Cancel Upload Data
                          </FormButton>
                        </Grid>
                      </>
                    )}
                  </GridContainer>

                  <ActionStatus loading={loadingSubtask} error={errorSubtask} />

                  <ActionStatus
                    loading={loadingSubTaskCreate}
                    error={errorSubTaskCreate}
                    success={successSubTaskCreate}
                    message={messageSubTaskCreate}
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

                  <AppModal
                    title={"Uploaded Data"}
                    open={openModel}
                    setOpen={setOpenModel}
                  >
                    <div className="App">
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                      />
                      {data.length > 0 && (
                        <>
                          <AppFormButton
                            label="Confirm Upload Data"
                            onPress={ConfirmUploadHandler}
                            item={data}
                          />

                          <p>
                            {data?.length +
                              " Items Selected to be uploaded, Please Confirm"}
                          </p>
                        </>
                      )}
                      {data.length > 0 && (
                        <table className="table">
                          <thead>
                            <tr>
                              {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((row, index) => (
                              <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                  <td key={index}>{value}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      <br />
                      <br />
                      ... Select Excel File with columns 1/ Item And 2/ item
                      Status
                    </div>
                  </AppModal>

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
