import React from "react";

import { useField } from "formik";
import { useFormikContext } from "formik";
import MessageBox from "../../MessageBox";
import { TextareaAutosize } from "../../../../node_modules/@material-ui/core/index";

const TextAreaForm = ({
  name,
  instruction,
  label,
  placeholder,
  required,
  ...otherProps
}) => {
  const { setFieldValue, values } = useFormikContext();

  const [field, mata] = useField(name);

  const handleChange = (evt) => {
    const text = evt.target.value;
    setFieldValue(name, text);

    instruction && instruction(setFieldValue, values, text, evt);
  };

  return (
    <>
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
      <TextareaAutosize
        onChange={handleChange}
        value={values[name]}
        style={{
          width: "100%",
          borderColor: mata && mata.touched && mata.error && "#ffe0e0",
        }}
        placeholder={placeholder}
        {...otherProps}
      />
      {mata && mata.touched && mata.error && field && (
        <MessageBox variant="danger">{mata.error}</MessageBox>
      )}
    </>
  );
};

export default TextAreaForm;
