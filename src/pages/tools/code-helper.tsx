import React, { lazy, Suspense } from "react";
import MuiPageWrapper from "@site/src/components/common/mui-page-wrapper";
import InterfaceGenerateLoader from "@site/src/components/tools/interface-generate-loader";

const InterfaceGenerate = lazy(() => import("@site/src/components/tools/interface-generate"));

const CodeHelper = () => {
  return (
    <MuiPageWrapper>
      <Suspense fallback={<InterfaceGenerateLoader />}>
        <InterfaceGenerate />
      </Suspense>
    </MuiPageWrapper>
  );
};

export default CodeHelper;
