import React, { lazy } from "react";
import PageWrapper from "@site/src/components/common/PageWrapper";
const Hello = lazy(() => import("@site/src/components/hello"));

export default function Home(): JSX.Element {
  return (
    <PageWrapper>
      <Hello />
    </PageWrapper>
  );
}
