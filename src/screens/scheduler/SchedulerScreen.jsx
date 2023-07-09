import React, { useEffect, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import "./scheduler.css";

import Scheduler, {
  Resource,
  View,
  Scrolling,
} from "devextreme-react/scheduler";
import { useDispatch, useSelector } from "react-redux";
import {
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_DELETE_RESET,
  APPOINTMENT_UPDATE_RESET,
} from "../../redux/constants/appointmentConstants";
import {
  createAppointment,
  deleteAppointment,
  listAppointments,
  updateAppointment,
} from "../../redux/actions/appointmentActions";
import { ActionStatus } from "../../components/ActionStatus";
import { listUsers } from "../../redux/actions/userActions";
import moment from "../../../node_modules/moment/moment";
import AppDateTimePicker from "../../components/appDateTimePicker/AppDateTimePicker";
import ReactSelect from "../../components/react-select/ReactSelect";
import { colorResource } from "../../data";
import { objectId } from "../../utils";
// import "../../node_modules/@syncfusion/ej2/material.css";

// import {
//   ScheduleComponent,
//   TimelineViews,
//   TimelineMonth,
//   Inject,
//   ResourcesDirective,
//   ResourceDirective,
//   ViewsDirective,
//   ViewDirective,
//   DragAndDrop,
//   Resize,
// } from "@syncfusion/ej2-react-schedule";

// import { extend } from "@syncfusion/ej2-base";
// import { updateSampleSection } from "./sample-base";

// import * as dataSource from "../../datasource.json";

const currentDate = moment();

const groups = ["user"];

const startDayHour = 8;
const endDayHour = 20;

export default function SchedulerScreen(props) {
  const userInfo =
    props.match && props.match.params.userid !== ""
      ? props.match.params.userid
      : null;

  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();
  const views = ["day", "week"];

  const [resources, setResources] = useState([]);
  const [listUser, setListUsers] = useState();

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;

  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = appointmentCreate;

  const appointmentUpdate = useSelector((state) => state.appointmentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = appointmentUpdate;

  const appointmentDelete = useSelector((state) => state.appointmentDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = appointmentDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      setTimeout(function () {
        dispatch({ type: APPOINTMENT_CREATE_RESET });
      }, 2000);
    }

    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: APPOINTMENT_UPDATE_RESET });
      }, 2000);
    }
    if (!successCreate && !successDelete && !successUpdate) {
      dispatch(
        listAppointments({
          name: "",
          pageNumber: 1,
          pageSize: 15,
          firstDate,
          lastDate,
          users:
            listUser && listUser.length > 0 ? objectId(listUser) : userInfo,
        })
      );
    }
    dispatch(listUsers({ pageNumber: 1, pageSize: 15 }));
  }, [
    dispatch,
    successCreate,
    successUpdate,
    successDelete,
    firstDate,
    lastDate,
    listUser,
    userInfo,
  ]);

  useEffect(() => {
    if (successDelete) {
      setTimeout(function () {
        dispatch({ type: APPOINTMENT_DELETE_RESET });
      }, 2000);
    }
  }, [dispatch, successDelete]);

  useEffect(() => {
    let tempUSers = "";
    if (users && users?.length > 0) {
      tempUSers = users.map((element, index) => {
        return {
          id: element._id,
          text: element.name,
          color: colorResource[index].color,
        };
      });
    }

    setResources(tempUSers);
  }, [users]);

  const searchHandler = (e) => {
    dispatch(
      listAppointments({
        text: e.target.value,
        pageNumber: 1,
        pageSize: 15,
        firstDate,
        lastDate,
        users: listUser && listUser.length > 0 ? objectId(listUser) : userInfo,
      })
    );
  };

  const createHandler = (appointmentData) => {
    dispatch(
      createAppointment({
        text: appointmentData.text || "Appointment",
        description: appointmentData.description || "Appointment Description",
        startDate: appointmentData.startDate,
        endDate: appointmentData.endDate,
        user: appointmentData.user || userInfo._id,
      })
    );
  };

  const updateHandler = (appointmentData) => {
    dispatch(
      updateAppointment({
        _id: appointmentData._id,
        text: appointmentData.text,
        description: appointmentData.description,
        startDate: appointmentData.startDate,
        endDate: appointmentData.endDate,
        user: appointmentData.user || userInfo._id,
      })
    );
  };

  const deleteHandler = (appointmentID) => {
    if (window.confirm("Are you sure to delete")) {
      dispatch(deleteAppointment(appointmentID));
    }
  };

  const onOptionChanged = (e) => {
    if (e.name === "currentDate") {
      setFirstDate(moment(e.value).format("YYYY MMM DD"));
      setLastDate(moment(e.value).format("YYYY MMM DD"));
    }
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
    <>
      <div className="row">
        <div className="row">
          <h1>Appointments : </h1>
          <input
            type="search"
            id="appointment"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="Appointment Text"
            autoComplete="off"
          />
          {!userInfo && (
            <div className="dropdown-select row">
              <ReactSelect
                setSelectedOptions={setListUsers}
                onInputChange={(e) => {
                  handleInputChange(e, listUsers);
                }}
                closeMenuOnSelect={true}
                options={users}
                defaultValue={listUser && listUser}
                isMulti={true}
                isSearchable
                name="User :"
                loading={loadingUser}
                error={errorUser}
                placeholder={"Users"}
                // label={"User : "}
              />
            </div>
          )}
          <div className="row">
            <AppDateTimePicker
              selectedDate={firstDate}
              setSelectedDate={setFirstDate}
              label={"Start Date : "}
            />
            <AppDateTimePicker
              selectedDate={lastDate}
              setSelectedDate={setLastDate}
              label={"End Date : "}
            />
          </div>
        </div>
      </div>
      <ActionStatus loading={loading} error={error} />
      <ActionStatus loading={loadingUser} error={errorUser} />
      <ActionStatus
        loading={loadingCreate}
        error={errorCreate}
        success={successCreate}
        message={"Appointment Created Successfuly"}
      />
      <ActionStatus
        loading={loadingUpdate}
        error={errorUpdate}
        success={successUpdate}
        message={"Appointment Updated Successfuly"}
      />
      <ActionStatus
        loading={loadingDelete}
        error={errorDelete}
        success={successDelete}
        message={"Appointment Deleted Successfuly"}
      />
      {!userInfo ? (
        <Scheduler
          onAppointmentFormOpening={(e) => {
            console.log("e", e);
          }}
          dataSource={appointments && appointments}
          height={700}
          width={1220}
          defaultCurrentView="Timeline"
          defaultCurrentDate={currentDate}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          cellDuration={120}
          showAllDayPanel={false}
          groups={groups}
          onAppointmentAdded={(e) => {
            createHandler(e.appointmentData);
          }}
          onAppointmentDeleted={(e) => {
            deleteHandler(e.appointmentData._id);
          }}
          onAppointmentUpdated={(e) => {
            updateHandler(e.appointmentData);
          }}
          onOptionChanged={(e) => {
            onOptionChanged(e);
          }}
        >
          {/* <View type="Today" name="Today" groupOrientation="vertical" /> */}
          <View
            type="timelineWorkWeek"
            name="Timeline"
            groupOrientation="vertical"
          />
          <View type="workWeek" groupOrientation="vertical" />
          <View type="month" groupOrientation="horizontal" />
          <Resource fieldExpr="user" dataSource={resources} label="Employee" />
          <Scrolling mode="virtual" />
        </Scheduler>
      ) : (
        <Scheduler
          dataSource={appointments && appointments}
          views={views}
          defaultCurrentView="week"
          defaultCurrentDate={currentDate}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          height={600}
          onAppointmentAdded={(e) => {
            createHandler(e.appointmentData);
          }}
          onAppointmentDeleted={(e) => {
            deleteHandler(e.appointmentData._id);
          }}
          onAppointmentUpdated={(e) => {
            updateHandler(e.appointmentData);
          }}
        />
      )}
    </>
  );
}

// export default function InlineEditing() {
//   useEffect(() => {
//     updateSampleSection();
//   }, []);
//   let scheduleObj;
//   const data = extend(
//     [],
//     dataSource.resourceData.concat(dataSource.timelineResourceData),
//     null,
//     true
//   );
//   const workDays = [0, 1, 2, 3, 4, 5];
//   const categoriesData = [
//     { text: "Nancy", id: 1, groupId: 1, color: "#df5286" },
//     { text: "Steven", id: 2, groupId: 1, color: "#7fa900" },
//     { text: "Robert", id: 3, groupId: 2, color: "#ea7a57" },
//     { text: "Smith", id: 4, groupId: 2, color: "#5978ee" },
//     { text: "Michael", id: 5, groupId: 3, color: "#df5286" },
//   ];
//   function onEventRendered(args) {
//     let categoryColor = args.data.CategoryColor;
//     if (!args.element || !categoryColor) {
//       return;
//     }
//     if (scheduleObj.currentView === "Agenda") {
//       args.element.firstChild.style.borderLeftColor = categoryColor;
//     } else {
//       args.element.style.backgroundColor = categoryColor;
//     }
//   }
//   return (
//     <div className="schedule-control-section">
//       <div className="col-lg-12 control-section">
//         <div className="control-wrapper">
//           <ScheduleComponent
//             width="100%"
//             height="650px"
//             ref={(t) => (scheduleObj = t)}
//             cssClass="inline-edit"
//             workDays={workDays}
//             currentView="TimelineWeek"
//             allowInline={true}
//             selectedDate={new Date(2023, 0, 4)}
//             eventSettings={{ dataSource: data }}
//             group={{ resources: ["Categories"] }}
//             eventRendered={onEventRendered.bind(this)}
//           >
//             <ResourcesDirective>
//               <ResourceDirective
//                 field="TaskId"
//                 title="Category"
//                 name="Categories"
//                 allowMultiple={true}
//                 dataSource={categoriesData}
//                 textField="text"
//                 idField="id"
//                 colorField="color"
//               ></ResourceDirective>
//             </ResourcesDirective>
//             <ViewsDirective>
//               <ViewDirective option="TimelineWeek" />
//               <ViewDirective option="TimelineMonth" />
//             </ViewsDirective>
//             <Inject
//               services={[TimelineViews, TimelineMonth, DragAndDrop, Resize]}
//             />
//           </ScheduleComponent>
//         </div>
//       </div>
//     </div>
//   );
// }
