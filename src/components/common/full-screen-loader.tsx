import { CircularProgress } from "@mui/material";
import React from "react";
import FullScreenWrapper from "@site/src/components/common/full-screen-wrapper";

const FullScreenLoader = () => (
  <FullScreenWrapper>
    <CircularProgress size="lg" />
    <div style={{ height: 30, width: 30 }} />
  </FullScreenWrapper>
);

export default FullScreenLoader;
