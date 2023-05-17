import React from "react";
import { useField } from "formik";
import { useFormikContext } from "formik";
import MessageBox from "../../MessageBox";
import moment from "../../../../node_modules/moment/moment";

const AppDateTimePickerForm = ({
  maxDate,
  minDate,
  label,
  disabled,
  name,
  required,
  instruction,
}) => {
  const { setFieldValue, values } = useFormikContext();

  const [mata] = useField(name);

  const handleChange = (e) => {
    const text = e.target.value;
    setFieldValue(name, text);

    instruction && instruction(setFieldValue, values, text, e);
  };

  return (
    <div>
      <div>
        <p></p>
      </div>
      <div>
        <label
          htmlFor={name}
          style={
            mata && mata.touched && mata.error
              ? { color: "red", fontSize: "2.5rem" }
              : {}
          }
        >
          {required && "* "}
        </label>
        <label htmlFor={name}>{label}</label>
      </div>
      <input
        type="date"
        id="date"
        name="date"
        lang="en-US"
        value={moment(values[name]).format("YYYY-MM-DD")}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      {mata && mata.touched && mata.error && (
        <MessageBox variant="danger">{mata.error}</MessageBox>
      )}
    </div>
  );
};

export default AppDateTimePickerForm;
