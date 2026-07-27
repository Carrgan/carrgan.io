import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PageWrapper from "@site/src/components/common/page-wrapper";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

const MuiPageWrapper = ({ children }: { children: React.ReactElement }) => {
  return (
    <PageWrapper>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </PageWrapper>
  );
};

export default MuiPageWrapper;
