import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

export default function SubmitButton({ children, label, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  const onSubmit = () => {
    handleSubmit();
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
