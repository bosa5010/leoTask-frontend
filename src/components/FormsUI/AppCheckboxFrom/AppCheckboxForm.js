import React from "react";
import { useFormikContext } from "formik";
import { useField } from "formik";
import MessageBox from "../../MessageBox";
import "./appCheckboxForm.css";
import { Switch } from "@material-ui/core";

import { FormControlLabel } from "../../../../node_modules/@material-ui/core/index";
import { Field } from "formik";

const AppCheckboxForm = ({ label, name, required, instruction }) => {
  const { setFieldValue, values } = useFormikContext();

  const [mata] = useField(name);

  const handleChange = () => {
    setFieldValue(name, !values[name]);

    instruction && instruction(setFieldValue, values);
  };

  return (
    <div style={{ width: "100%", flex: 1 }}>
      {label && (
        <div>
          <label for={name}>{required ? "* " + label : label}</label>
        </div>
      )}
      <FormControlLabel
        control={
          <Field
            label=""
            name={name}
            component={Switch}
            onChange={handleChange}
            checked={values[name]}
          />
        }
      />
      {mata && mata.touched && mata.error && (
        <MessageBox variant="danger">{mata.error}</MessageBox>
      )}
    </div>
  );
};

export default AppCheckboxForm;
