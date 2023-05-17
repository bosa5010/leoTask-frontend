import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

export default function FormButton({ children, onPress, item, ...otherProps }) {
  const { setFieldValue, values, resetForm } = useFormikContext();

  const onSubmit = () => {
    onPress(setFieldValue, resetForm, values, item);
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    size: "large",
    fullWidth: true,
    onClick: onSubmit,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
}
