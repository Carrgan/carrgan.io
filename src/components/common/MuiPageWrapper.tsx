import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import PageWrapper from "@site/src/components/common/PageWrapper";

const MuiPageWrapper = ({ children }: { children: React.ReactElement }) => {
  return (
    <PageWrapper>
      <CssVarsProvider defaultMode={"dark"}>{children}</CssVarsProvider>
    </PageWrapper>
  );
};

export default MuiPageWrapper;
