import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

export default function RegisterStepper({ steps, activeStep }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
