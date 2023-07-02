import { CircularProgress } from "@mui/joy";
import React from "react";

const FullScreenLoader = () => (
  <div
    style={{
      height: "95vh",
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <CircularProgress size="lg" variant="plain" />
    <div style={{ height: 30, width: 30 }} />
  </div>
);

export default FullScreenLoader;
