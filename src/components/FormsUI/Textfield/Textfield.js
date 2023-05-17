import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useField } from "formik";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    fontSize: 15,
  },
  labelRoot: {
    fontSize: 13.5,
    // color: "blue",
    // "&$labelFocused": {
    //   color: "purple",
    // },
  },
  labelFocused: {},
  formHelperText: { fontSize: 10 },
}));

const TextfieldWrapper = ({
  name,
  size = "large",
  instruction,
  min,
  max,
  ...otherProps
}) => {
  const { setFieldValue, values } = useFormikContext();

  const [field, mata] = useField(name);
  const classes = useStyles();

  const handleChange = (evt) => {
    const text = evt.target.value;
    setFieldValue(name, text);

    instruction && instruction(setFieldValue, values, text);
  };

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "filled",
    onChange: handleChange,
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return (
    <TextField
      {...configTextfield}
      size={size}
      InputProps={{
        classes: { root: classes.inputRoot },
        inputProps: {
          min: min,
          max: max,
        },
      }}
      autoComplete="new-password"
      FormHelperTextProps={{ classes: { root: classes.formHelperText } }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused,
        },
      }}
    />
  );
};

export default TextfieldWrapper;
