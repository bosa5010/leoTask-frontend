import React from "react";

import { useField } from "formik";
import { useFormikContext } from "formik";
import ReactSelect from "../../react-select/ReactSelect";
import MessageBox from "../../MessageBox";

const ReactSelectForm = ({ name, instruction, value, ...otherProps }) => {
  const { setFieldValue, values } = useFormikContext();

  const [field, mata] = useField(name);

  const handleChange = (evt) => {
    const text = evt;

    setFieldValue(name, text);

    instruction && instruction(setFieldValue, values, text, evt);
  };

  return (
    <>
      <ReactSelect
        onChange={handleChange}
        value={values[name]}
        defaultValue={values[name]}
        mandatoryError={mata && mata.touched && mata.error && field}
        {...otherProps}
      />
      {mata && mata.touched && mata.error && field && (
        <MessageBox variant="danger">{mata.error}</MessageBox>
      )}
    </>
  );
};

export default ReactSelectForm;
