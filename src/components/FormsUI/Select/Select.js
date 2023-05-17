import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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
  labelFocused: {},
  formHelperText: { fontSize: 10 },
}));

const SelectWrapper = ({ name, options, instruction, ...otherProps }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);
  const classes = useStyles();

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);

    instruction && instruction(setFieldValue, values, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField
      {...configSelect}
      InputProps={{ classes: { root: classes.inputRoot } }}
      FormHelperTextProps={{ classes: { root: classes.formHelperText } }}
      InputLabelProps={{
        classes: {
          root: classes.labelRoot,
          focused: classes.labelFocused,
        },
      }}
    >
      {options &&
        Object.keys(options).map((item, pos) => {
          return (
            <MenuItem key={pos} value={item}>
              {options[item]}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default SelectWrapper;
