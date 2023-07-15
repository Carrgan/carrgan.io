import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { lazy, Suspense } from "react";
import FullScreenLoader from "@site/src/components/common/FullScreenLoader";
const Layout = lazy(() => import("@theme/Layout"));

const PageWrapper = ({ children }: { children: React.ReactElement }): JSX.Element => {
  return (
    <BrowserOnly>
      {() => (
        <Suspense fallback={<FullScreenLoader />}>
          <Layout description="Description will go into a meta tag in <head />">{children}</Layout>
        </Suspense>
      )}
    </BrowserOnly>
  );
};

export default PageWrapper;
