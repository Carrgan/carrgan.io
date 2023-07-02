import React, { Suspense, lazy } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import FullScreenLoader from "@site/src/components/common/FullScreenLoader";
const Hello = lazy(() => import("@site/src/components/hello"));
const Layout = lazy(() => import("@theme/Layout"));

export default function Home(): JSX.Element {
  return (
    <BrowserOnly>
      {() => (
        <Suspense fallback={<FullScreenLoader />}>
          <Layout description="Description will go into a meta tag in <head />">
            <Hello />
          </Layout>
        </Suspense>
      )}
    </BrowserOnly>
  );
}
