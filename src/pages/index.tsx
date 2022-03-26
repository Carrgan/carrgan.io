import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Hello from "@site/src/components/hello";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      // title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <BrowserOnly>{() => <Hello />}</BrowserOnly>
    </Layout>
  );
}
