import React from "react";
import SwitchUi from "@material-ui/core/Switch";

import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function Switch({ label, value, setValue, insctruction }) {
  const onChange = () => {
    setValue(!value);
    insctruction();
  };

  return (
    <FormControlLabel
      value={value}
      onChange={onChange}
      control={<SwitchUi color="primary" />}
      label={label}
      labelPlacement="start"
    />
  );
}
