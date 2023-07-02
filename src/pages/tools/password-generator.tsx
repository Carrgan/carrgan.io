import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { CssVarsProvider } from "@mui/joy/styles";
import RandomPassword from "@site/src/components/tools/RandomPassword";

export default function PasswordGenerator(): JSX.Element {
  return (
    <Layout>
      <BrowserOnly>
        {() => (
          <CssVarsProvider defaultMode={"dark"}>
            <div style={{ display: "flex", justifyContent: "center", margin: 24 }}>
              <div
                style={{
                  height: "80vh",
                  width: "60vw",
                  maxWidth: "1600px",
                  background: "#25252d",
                  borderRadius: "5px",
                  padding: 24
                }}
              >
                <header>
                  <h1>Password generation</h1>
                  <div className="container_x5Un margin-vert--md">
                    Version 1.0 @{" "}
                    <time dateTime="2023-07-2T00:00:00.000Z" itemProp="datePublished">
                      2023.07.02
                    </time>
                  </div>
                </header>
                <RandomPassword />
              </div>
            </div>
          </CssVarsProvider>
        )}
      </BrowserOnly>
    </Layout>
  );
}
