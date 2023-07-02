import React, { Suspense, lazy } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BrowserOnly from "@docusaurus/BrowserOnly";
import FullScreenLoader from "@site/src/components/common/FullScreenLoader";
const Hello = lazy(() => import("@site/src/components/hello"));

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <BrowserOnly>
        {() => (
          <Suspense fallback={<FullScreenLoader />}>
            <Hello />
          </Suspense>
        )}
      </BrowserOnly>
    </Layout>
  );
}
