import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { lazy, Suspense } from "react";
import SkeletonFullLoading from "@site/src/components/common/SkeletonFullLoading";

const Layout = lazy(() => import("@theme/Layout"));

const PageWrapper = ({
  children,
  noFooter,
  noLayout
}: {
  children: React.ReactElement;
  noFooter?: boolean;
  noLayout?: boolean;
}): JSX.Element => {
  return (
    <BrowserOnly>
      {() => (
        <Suspense fallback={<SkeletonFullLoading />}>
          {noLayout ? (
            children
          ) : (
            <Layout wrapperClassName={"test"} noFooter={noFooter}>
              {children}
            </Layout>
          )}
        </Suspense>
      )}
    </BrowserOnly>
  );
};

export default PageWrapper;
