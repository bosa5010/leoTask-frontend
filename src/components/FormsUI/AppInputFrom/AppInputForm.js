import React from "react";
import { useField } from "formik";
import { useFormikContext } from "formik";
import MessageBox from "../../MessageBox";
import "./appInputForm.css";

const AppInputForm = ({
  max,
  min,
  label,
  disabled,
  type = "text",
  name,
  required,
  instruction,
}) => {
  const { setFieldValue, values } = useFormikContext();

  const [field, mata] = useField(name);

  const handleChange = (e) => {
    const text = e.target.value;
    setFieldValue(name, text);

    instruction && instruction(setFieldValue, values, text, e);
  };

  return (
    <div>
      <div style={{ width: "100%", marginTop: 10 }}>
        {/* <label htmlFor={name}>{required ? "* " + label : label}</label> */}

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
        style={{ width: "100%" }}
        type={type}
        id={name}
        name={name}
        value={values[name]}
        min={min}
        max={max}
        disabled={disabled}
        autoComplete="new-password"
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      {mata && mata.touched && mata.error && field && (
        <MessageBox variant="danger">{mata.error}</MessageBox>
      )}
    </div>
  );
};

export default AppInputForm;
