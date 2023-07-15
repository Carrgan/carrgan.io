import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { lazy, Suspense } from "react";
import SkeletonFullLoading from "@site/src/components/common/SkeletonFullLoading";
const Layout = lazy(() => import("@theme/Layout"));

const PageWrapper = ({ children }: { children: React.ReactElement }): JSX.Element => {
  return (
    <BrowserOnly>
      {() => (
        <Suspense fallback={<SkeletonFullLoading />}>
          <Layout>{children}</Layout>
        </Suspense>
      )}
    </BrowserOnly>
  );
};

export default PageWrapper;
