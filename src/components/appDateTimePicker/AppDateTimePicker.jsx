import React from "react";
import moment from "../../../node_modules/moment/moment";

const AppDateTimePicker = ({
  selectedDate = new Date().toISOString().substring(0, 10),
  maxDate,
  minDate,
  setSelectedDate,
  onChange,
  label,
  disabled,
}) => {
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onChange && onChange(e);
  };

  // function lastweek() {
  //   var today = new Date();
  //   var lastweek = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() - 7
  //   );

  //   return lastweek;
  // }

  return (
    <div className="dateTimePicker">
      <label for="date">{label}</label>
      <input
        type="date"
        id="date"
        name="date"
        lang="fr-CA"
        value={moment(selectedDate).format("YYYY-MM-DD")}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        onChange={(e) => {
          handleDateChange(e);
        }}
      ></input>
    </div>
  );
};

export default AppDateTimePicker;
