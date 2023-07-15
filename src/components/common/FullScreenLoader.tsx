import { CircularProgress } from "@mui/joy";
import React from "react";
import FullScreenWrapper from "@site/src/components/common/FullScreenWrapper";

const FullScreenLoader = () => (
  <FullScreenWrapper>
    <CircularProgress size="lg" variant="plain" />
    <div style={{ height: 30, width: 30 }} />
  </FullScreenWrapper>
);

export default FullScreenLoader;
