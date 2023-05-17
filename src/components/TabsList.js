import * as React from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function TabsList({
  steps,
  currentStep,
  selectStepHandler,
  value,
  setValue,
}) {
  var index = 0;

  if (steps) {
    index = steps.findIndex((object) => {
      return object._id === currentStep?._id;
    });
  }

  React.useEffect(() => {
    setValue(index);
  }, [index, setValue]);

  return (
    <Box>
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons
        aria-label="scrollable auto tabs example"
      >
        {steps &&
          currentStep &&
          steps.map((step, index) => (
            <Tab
              sx={
                step.number <= currentStep.number
                  ? {
                      fontSize: 13,
                      color: "blue",
                      display: "row",
                      fontWeight: "bold",
                    }
                  : {
                      fontSize: 13,
                      color: "#c0c0c0",
                    }
              }
              key={index}
              icon={
                step.number < currentStep.number ? (
                  <p className="active">&#10004;</p>
                ) : (
                  <p></p>
                )
              }
              iconPosition="end"
              label={index + 1 + "  - " + step.name}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onClick={() => {
                selectStepHandler && selectStepHandler(step);
                setValue(index);
              }}
            />
          ))}
      </Tabs>
    </Box>
  );
}
