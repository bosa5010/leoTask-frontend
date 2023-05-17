import React from "react";
import { Done } from "@material-ui/icons";
import { SlArrowRight } from "react-icons/sl";

export default function StepsList({ steps, currentStep }) {
  return (
    <div className="row action-steps">
      {steps &&
        currentStep &&
        steps.map((step, index) => (
          <div key={index} className="row action-steps-div">
            <div className="row action-steps-div">
              <div
                className={
                  step.number <= currentStep.number
                    ? "active action-steps-div "
                    : "action-steps-div"
                }
              >
                {index + 1 + "  - " + step.name}
                {step.number < currentStep.number && (
                  <Done className="active" />
                )}
              </div>
            </div>

            {index + 1 < steps.length && (
              <SlArrowRight
                className={
                  step.number <= currentStep.number ? "activeIcon" : "arrowIcon"
                }
              />
            )}
          </div>
        ))}
    </div>
  );
}
