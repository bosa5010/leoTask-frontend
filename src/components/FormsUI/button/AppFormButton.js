import React from "react";
import { useFormikContext } from "formik";

export default function AppFormButton({
  children,
  onPress,
  item,
  label,
  leftIcon,
  rightIcon,
  isDisabled,
  ...otherProps
}) {
  const { setFieldValue, values, resetForm } = useFormikContext();

  const onSubmit = () => {
    onPress && onPress(values, label, setFieldValue, resetForm, item);
  };

  return (
    <button
      type="button"
      className="adlButton"
      onClick={onSubmit}
      disabled={isDisabled}
      {...otherProps}
    >
      <div className="row ">
        {leftIcon && leftIcon}
        {label}
        {rightIcon && rightIcon}
      </div>
    </button>
  );
}
