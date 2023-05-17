import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    fontSize: 15,
  },
  labelRoot: {
    fontSize: 15,
    // color: "blue",
    // "&$labelFocused": {
    //   color: "purple",
    // },
  },
  formHelperText: { fontSize: 10 },
}));

const DateTimePicker = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const classes = useStyles();

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <TextField
      {...configDateTimePicker}
      InputProps={{
        classes: { root: classes.inputRoot },
      }}
      autoComplete="new-password"
      FormHelperTextProps={{ classes: { root: classes.formHelperText } }}
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.labelRoot,
        },
      }}
    />
  );
};

export default DateTimePicker;
