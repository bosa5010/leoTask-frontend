import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingBox() {
  return (
    <div className="loading">
      Loading ...
      <LinearProgress color="success" />
    </div>
  );
}
